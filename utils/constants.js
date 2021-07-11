module.exports.errorMessages = {
  serverErrorMessage:
    'На сервере произошла ошибка',
  notFoundErrorMessage:
    'Ресурс не найден',
  validationErrorMessage:
    'Введены некорректные данные',
  authorizationErrorMessage:
    'Необходима авторизация',
  loginValidationErrorMessage:
    'Переданы некорректные данные при попытке входа',
  sameEmailErrorMessage:
    'Пользователь с таким email уже зарегистрирован',
  invalidCredentialsErrorMessage:
    'Неправильные почта или пароль',
  createUserValidationErrorMessage:
    'Переданы некорректные данные при создании пользователя',
  createMovieValidationErrorMessage:
    'Переданы некорректные данные при сохранении фильма',
  updateUserValidationErrorMessage:
    'Переданы некорректные данные при обновлении профиля',
  deleteMovieRestrictionErrorMessage:
    'У вас нет прав для удаления данного фильма',
  userNotFoundErrorMessage:
    'Пользователь по указанному _id не найден',
  movieNotFoundErrorMessage:
    'Фильм с указанным _id не найден',
  invalidUrlErrorMessage:
    'Передан некорректный URL-адрес',
};

module.exports.successMessages = {
  loginSuccessMessage:
    'Вход успешно выполнен!',
  logoutSuccessMessage:
    'Выход успешен',
  deleteMovieSuccessMessage:
    'Фильм успешно удален',
};
