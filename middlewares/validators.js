const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');

module.exports.loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.createUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
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
      .custom((v, helpers) => {
        if (!isURL(v, { require_protocol: true })) {
          return helpers.error('link.invalid');
        }

        return v;
      }),
    trailer: Joi
      .string()
      .required()
      .custom((v, helpers) => {
        if (!isURL(v, { require_protocol: true })) {
          return helpers.error('link.invalid');
        }

        return v;
      }),
    thumbnail: Joi
      .string()
      .required()
      .custom((v, helpers) => {
        if (!isURL(v, { require_protocol: true })) {
          return helpers.error('link.invalid');
        }

        return v;
      }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.deleteMovieValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});
