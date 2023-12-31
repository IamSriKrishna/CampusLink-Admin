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
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  certified: {
    type: Boolean,
    default: false,
  },
  fcmtoken: {
    type: String,
    required: true,
  },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
