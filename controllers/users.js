const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = require('../config');
const User = require('../models/user');
const NotFoundError = require('../utils/errors/NotFoundError');
const ValidationError = require('../utils/errors/ValidationError');
const ConflictError = require('../utils/errors/ConflictError');
const { errorMessages, successMessages } = require('../utils/constants');

const {
  loginValidationErrorMessage,
  sameEmailErrorMessage,
  createUserValidationErrorMessage,
  updateUserValidationErrorMessage,
  userNotFoundErrorMessage,
} = errorMessages;
const {
  loginSuccessMessage,
  logoutSuccessMessage,
} = successMessages;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
      );

      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: 'None',
          secure: NODE_ENV === 'production',
        })
        .send({ message: loginSuccessMessage });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError(loginValidationErrorMessage));
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
    .send({ message: logoutSuccessMessage });
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
        return next(new ConflictError(sameEmailErrorMessage));
      }

      if (err.name === 'ValidationError') {
        return next(new ValidationError(createUserValidationErrorMessage));
      }

      return next(err);
    });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        return next(new ConflictError(sameEmailErrorMessage));
      }

      if (err.name === 'CastError') {
        return next(new NotFoundError(userNotFoundErrorMessage));
      }

      if (err.name === 'ValidationError') {
        return next(new ValidationError(updateUserValidationErrorMessage));
      }

      return next(err);
    });
};
