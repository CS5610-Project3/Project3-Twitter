const mongoose = require("mongoose");

const DB_ENDPOINT = 'mongodb+srv://project3:test123@cluster0.r7mqvfk.mongodb.net/TwitterDB?retryWrites=true&w=majority';


const connectDB = async () => {
  try {
    await mongoose.connect(DB_ENDPOINT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
