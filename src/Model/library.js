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
  borrowers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  photo: {
    type: String,
    default: "",
  },
  section_image: {
    type: String,
    default: "",
  },
});

const Library = mongoose.model("Library", librarySchema);

module.exports = Library;
