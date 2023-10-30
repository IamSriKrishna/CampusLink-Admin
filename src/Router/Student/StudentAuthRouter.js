// Packages
const express = require("express");

const {
  studentSignIn,
  studentSignUp,
  studentSignOut,
} = require("../../Handler/Student/StudentAuthHandler");

const TokenValid = require("../../Handler/Student/StudentAuthHandler");

// INIT
const StudentRouter = express.Router();

// Error Handling Middleware
StudentRouter.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Something went wrong on the server" });
});

//signup endpoint
StudentRouter.post("/kcg/student/signup", function (req, res) {
  studentSignUp;
});
//Signin endpoint
StudentRouter.post("/kcg/student/signin", function (req, res) {
  studentSignIn;
});
// Signout endpoint
StudentRouter.post("/kcg/student/signout", function (req, res) {
  studentSignOut;
});
// Token validation endpoint
StudentRouter.post("/tokenIsValid", function (req, res) {
  TokenValid;
});

module.exports = StudentRouter;
