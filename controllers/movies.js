const Movie = require('../models/movie');
const NotFoundError = require('../utils/errors/NotFoundError');
const ValidationError = require('../utils/errors/ValidationError');
const RestrictionError = require('../utils/errors/RestrictionError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
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
        return next(new ValidationError('Переданы некорректные данные при сохранении фильма'));
      }

      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с указанным _id не найден');
      }

      if (movie.owner.toString() !== req.user._id) {
        throw new RestrictionError('У вас нет прав для удаления данного фильма');
      }

      return Movie.findByIdAndRemove(req.params.movieId);
    })
    .then(() => res.send({ message: 'Фильм успешно удален' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new NotFoundError('Фильм с указанным _id не найден'));
      }

      return next(err);
    });
};
