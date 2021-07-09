const router = require('express').Router();
const auth = require('../middlewares/auth');
const { login, logout, createUser } = require('../controllers/users');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../utils/errors/NotFoundError');
const { createUserValidator, loginValidator } = require('../middlewares/validators');

router.post('/signup', createUserValidator, createUser);
router.post('/signin', loginValidator, login);
router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.get('/signout', logout);
router.use(() => {
  throw new NotFoundError('Ресурс не найден');
});

module.exports = router;
