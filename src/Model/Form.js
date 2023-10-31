const mongoose = require("mongoose");

const formSchema = mongoose.Schema({
  studentid: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
    trim: true,
  },
  rollno: {
    required: true,
    type: String,
  },
  dp: {
    required: true,
    type: String,
  },
  department: {
    required: true,
    type: String,
  },
  formtype: {
    required: true,
    type: String,
  },
  Studentclass: {
    required: true,
    type: String,
  },
  year: {
    required: true,
    type: String,
  },
  reason: {
    required: true,
    type: String,
    trim: true,
  },
  from: {
    required: true,
    type: String,
    trim: true,
  },
  to: {
    required: true,
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  no_of_days: {
    required: true,
    type: Number,
    trim: true,
  },
  spent: {
    required: true,
    type: Number,
  },
  response: {
    type: String,
    default: "Requested",
  },
  fcmtoken: {
    required: true,
    type: String,
    default: "",
  },
});

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
