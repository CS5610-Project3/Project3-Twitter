const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  discription: String,
  profileImage: String,
}, { timestamps: true }); // timestamps: true will automatically add createdAt and updatedAt fields to schema

module.exports = mongoose.model("User", userSchema);
