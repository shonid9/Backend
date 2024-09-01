//conection to the database to mongodb in dev inviroment and production inviroment as well as test inviroment
//routes and api for the user and the schedule and the exchange request and for the login and the register and the logout for waiters, bartenders, shift managers and managers



//db.config.js
require('dotenv').config({ path: './src/.env/Dev.env' });

const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGO_URI_DEV,
    jwtSecret: process.env.JWT_SECRET
  },
  production: {
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGO_URI_PROD,
    jwtSecret: process.env.JWT_SECRET
  }
};

module.exports = config[env];
