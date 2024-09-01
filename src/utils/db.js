

//db.js

const mongoose = require('mongoose');
const config = require('../config/db.config');

mongoose.set('strictQuery', true); // or mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
