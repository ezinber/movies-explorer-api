const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const NotFoundError = require('../utils/errors/NotFoundError');
const ValidationError = require('../utils/errors/ValidationError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      );

      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: 'None',
          secure: NODE_ENV === 'production',
        })
        .send({ message: 'Вход успешно выполнен!' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Переданы некорректные данные при попытке входа'));
      }

      return next(err);
    });
};

module.exports.logout = (req, res) => {
  res
    .clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'None',
      secure: NODE_ENV === 'production',
    })
    .send({ message: 'Выход успешен' });
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      const censoredUser = user;
      censoredUser.password = '***';

      res.status(201).send(censoredUser);
    })
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        const EmailError = new Error('Пользователь с таким email уже зарегистрирован');
        EmailError.statusCode = 409;

        return next(EmailError);
      }

      if (err.name === 'ValidationError') {
        return next(new ValidationError('Переданы некорректные данные при создании пользователя'));
      }

      return next(err);
    });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new NotFoundError('Пользователь по указанному _id не найден'));
      }

      return next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        const EmailError = new Error('Пользователь с таким email уже зарегистрирован');
        EmailError.statusCode = 409;

        return next(EmailError);
      }

      if (err.name === 'CastError') {
        return next(new NotFoundError('Пользователь с указанным _id не найден'));
      }

      if (err.name === 'ValidationError') {
        return next(new ValidationError('Переданы некорректные данные при обновлении профиля'));
      }

      return next(err);
    });
};
