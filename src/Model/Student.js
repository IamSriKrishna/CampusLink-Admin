const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    trim: true,
  },
  rollno: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
    trim: true,
  },
  credit: {
    type: Number,
    default: 5000,
  },
  dp: {
    required: true,
    type: String,
  },
  department: {
    required: true,
    type: String,
  },
  Studentclass: {
    type: String,
    default: "",
  },
  year: {
    type: String,
    default: "",
  },
  certified: {
    type: Boolean,
    default: false,
  },
  fcmtoken: {
    type: String,
    required: true,
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
