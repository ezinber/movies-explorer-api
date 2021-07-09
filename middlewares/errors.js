const { isCelebrateError } = require('celebrate');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  if (isCelebrateError(err) || (err.name === 'ValidationError' && !err.statusCode)) {
    return res.status(400).send({ message: 'Введены некорректные данные' });
  }

  const { statusCode = 500, message } = err;

  return res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
};
