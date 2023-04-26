require("dotenv").config();
const mongoose = require("mongoose");

const dbUrl = process.env.NODE_ENV === 'test' ? `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@localhost:27017/${process.env.TEST_MONGO_DB}?authSource=admin` : `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@localhost:27017/${process.env.MONGO_DB}?authSource=admin`;

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(dbUrl);
    console.log('database connected successfully...');
  } catch (error) {
    console.log("connection error...!\n");
    console.error(error);
    process.exit(1)
  }
};

module.exports = connectDB;