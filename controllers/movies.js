const Movie = require('../models/movie');
const NotFoundError = require('../utils/errors/NotFoundError');
const ValidationError = require('../utils/errors/ValidationError');
const RestrictionError = require('../utils/errors/RestrictionError');
const { errorMessages, successMessages } = require('../utils/constants');

const {
  createMovieValidationErrorMessage,
  movieNotFoundErrorMessage,
  deleteMovieRestrictionErrorMessage,
} = errorMessages;
const {
  deleteMovieSuccessMessage,
} = successMessages;

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError(createMovieValidationErrorMessage));
      }

      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(movieNotFoundErrorMessage);
      }

      if (movie.owner.toString() !== req.user._id) {
        throw new RestrictionError(deleteMovieRestrictionErrorMessage);
      }

      return movie.remove();
    })
    .then(() => res.send({ message: deleteMovieSuccessMessage }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new NotFoundError(movieNotFoundErrorMessage));
      }

      return next(err);
    });
};
