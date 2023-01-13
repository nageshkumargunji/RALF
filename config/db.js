const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoDB_URI');

const connectDB = async() => {
  try{
    await mongoose.connect(db, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false 
    });
    console.log('MongoDB connected successfully!');
  } catch(err) {
    console.log(err.message);
    // exit process with a failure code
    process.exit(1);
  }
}

module.exports = connectDB;