const mongoose = require("mongoose");

const librarySchema = mongoose.Schema({
  access_no: {
    required: true,
    type: [Number],
  },
  book_title: {
    required: true,
    type: String,
  },
  authors: {
    required: true,
    type: [String],
  },
  publisher: {
    required: true,
    type: String,
  },
  source_of_supply: {
    required: true,
    type: String,
  },
  no_of_copies: {
    required: true,
    type: String,
  },
  subject: {
    required: true,
    type: String,
  },
  borrowers: {
    type: Number,
    default: 0,
  },
});

const Library = mongoose.model("Library", librarySchema);

module.exports = Library;
