const mongoose = require('mongoose');

const connectDB = () => {
  return mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('MongoDB Connected: 127.0.0.1');
      return true;
    })
    .catch((error) => {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    });
};

module.exports = connectDB;