const { isCelebrateError } = require('celebrate');
const { errorMessages } = require('../utils/constants');

const {
  validationErrorMessage,
  serverErrorMessage,
} = errorMessages;

module.exports = (err, req, res, next) => {
  if (err) {
    if (isCelebrateError(err) || (err.name === 'ValidationError' && !err.statusCode)) {
      return res.status(400).send({ message: validationErrorMessage });
    }

    const { statusCode = 500, message } = err;

    return res
      .status(statusCode)
      .send({
        message: statusCode === 500
          ? serverErrorMessage
          : message,
      });
  }

  return next();
};
