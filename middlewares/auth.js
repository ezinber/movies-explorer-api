const jwt = require('jsonwebtoken');
const AuthorizationError = require('../utils/errors/AuthorizationError');
const { JWT_SECRET } = require('../config');
const { errorMessages } = require('../utils/constants');

const { authorizationErrorMessage } = errorMessages;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new AuthorizationError(authorizationErrorMessage);
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      JWT_SECRET,
    );
  } catch (err) {
    throw new AuthorizationError(authorizationErrorMessage);
  }

  req.user = payload;

  next();
};
