const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  pages: Number,
  category: String,
  language: String,
  posterURL: {
    type: String,
    required: true,
  },
  date: Date,
  userID: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Book", bookSchema);
