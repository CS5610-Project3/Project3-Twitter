const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); // timestamps: true will automatically add createdAt and updatedAt fields to schema

module.exports = mongoose.model('Post', postSchema);
