const mongoose = require("mongoose");

const facultySchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    trim: true,
  },
  email: {
    required: true,
    type: String,
    trim: true,
  },
  password: {
    required: true,
    type: String,
    trim: true,
  },
  dp: {
    required: true,
    type: String,
  },
  department: {
    required: true,
    type: String,
  },
  classTeacher: {
    type: String,
    default: "--",
  },
  role: {
    type: String,
    default: "--",
  },
});

const Faculty = mongoose.model("Faculty", facultySchema);

module.exports = Faculty;
