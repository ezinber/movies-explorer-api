const cors = require('cors');
const { CORS_ORIGIN } = require('../config');

module.exports = cors({
  origin: CORS_ORIGIN,
  credentials: true,
});
