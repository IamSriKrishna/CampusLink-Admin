//Packages
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

//package
const student = require("./src/Router/Student/StudentAuthRouter");
const studentData = require("./src/Router/Student/StudentDataRouter");
const form = require("./src/Router/FormAuth");
const hello = require("./src/Router/HelloRouter");
const faculty = require("./src/Router/Faculty/FacultyAuthRouter");
const facultyData = require("./src/Router/Faculty/FacultyDataRouter");
// middlewares

const app = express();

// Router
app.use(express.json());
app.use(student);
app.use(studentData);
app.use(form);
app.use(hello);
app.use(faculty);
app.use(facultyData);

//connecting to the database
mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("Successfully Connected to the database :)");
  })
  .catch((error) => {
    console.log(`Something Went Wrong:(\n${error}`);
  });

//Connecting to the port
app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Successfully Connected to the Port: ${process.env.PORT}`);
});
