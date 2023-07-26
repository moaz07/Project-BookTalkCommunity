const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  content: String,
  date: Date,
  bookID: { type: mongoose.SchemaTypes.ObjectId, ref: "Book" },
  userID: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Review", reviewSchema);
