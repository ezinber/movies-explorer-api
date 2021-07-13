const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const {
  NODE_ENV = 'develop',
  JWT_SECRET = 'dev-secret',
  MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb',
  PORT = 3000,
  CORS_ORIGIN = 'http://localhost:3000',
} = process.env;

module.exports = {
  NODE_ENV,
  JWT_SECRET,
  MONGO_URL,
  PORT,
  CORS_ORIGIN,
};
