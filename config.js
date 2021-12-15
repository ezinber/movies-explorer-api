const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const {
  NODE_ENV = 'develop',
  JWT_SECRET = 'dev-secret',
  BASE_ROUTE = '',
  MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb',
  PORT = 3000,
  CORS_ORIGIN = 'http://localhost:3001',
  SAME_SITE = 'None', /* Strict, Lax */
  SECURE = false,
} = process.env;

const cookieData = {
  maxAge: 3600000 * 24 * 7,
  httpOnly: true,
  sameSite: SAME_SITE,
};

if (SECURE) {
  cookieData.secure = true;
}

module.exports = {
  NODE_ENV,
  JWT_SECRET,
  BASE_ROUTE,
  MONGO_URL,
  PORT,
  CORS_ORIGIN,
  SAME_SITE,
  SECURE,
  cookieData,
};
