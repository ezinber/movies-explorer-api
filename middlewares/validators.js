const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');
const { errorMessages } = require('../utils/constants');

const { invalidUrlErrorMessage } = errorMessages;

module.exports.loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports.createUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports.updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports.createMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi
      .string()
      .required()
      .custom((value, helpers) => {
        if (isURL(value, { require_protocol: true })) {
          return value;
        }

        return helpers.error(invalidUrlErrorMessage);
      }),
    trailer: Joi
      .string()
      .required()
      .custom((value, helpers) => {
        if (isURL(value, { require_protocol: true })) {
          return value;
        }

        return helpers.error(invalidUrlErrorMessage);
      }),
    thumbnail: Joi
      .string()
      .required()
      .custom((value, helpers) => {
        if (isURL(value, { require_protocol: true })) {
          return value;
        }

        return helpers.error(invalidUrlErrorMessage);
      }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.deleteMovieValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});
