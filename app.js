const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { MONGO_URL, PORT } = require('./config');
const router = require('./routes/index');
const errors = require('./middlewares/errors');
const limiter = require('./middlewares/limiter');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);
app.use(limiter);
app.use(cors);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use(router);

app.use(errorLogger);
app.use(errors);

app.listen(PORT);
