const router = require('express').Router();
const { BASE_ROUTE } = require('../config');
const auth = require('../middlewares/auth');
const { login, logout, createUser } = require('../controllers/users');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../utils/errors/NotFoundError');
const { createUserValidator, loginValidator } = require('../middlewares/validators');
const { errorMessages } = require('../utils/constants');

const { notFoundErrorMessage } = errorMessages;

router.post(`${BASE_ROUTE}/signup`, createUserValidator, createUser);
router.post(`${BASE_ROUTE}/signin`, loginValidator, login);
router.use(auth);
router.use(`${BASE_ROUTE}/users`, usersRouter);
router.use(`${BASE_ROUTE}/movies`, moviesRouter);
router.get(`${BASE_ROUTE}/signout`, logout);
router.use(() => {
  throw new NotFoundError(notFoundErrorMessage);
});

module.exports = router;
