//Packages
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

//package
const student = require("./Router/StudentAuth");
const form = require("./Router/FormAuth");
const hello = require("./Router/HelloRouter");
// middlewares

const app = express();

// Router
app.use(express.json());
app.use(student);
app.use(form);
app.use(hello);

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
