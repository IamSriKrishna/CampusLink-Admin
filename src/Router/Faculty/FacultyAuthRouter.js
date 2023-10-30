// Packages
const express = require("express");

const {
  facultySignIn,
  facultySignUp,
  facultySignOut,
} = require("../../Handler/Faculty/FacultyAuthHandler");

const TokenValid = require("../../Handler/Faculty/FacultyAuthHandler");

// INIT
const FacultyRouter = express.Router();

// Error Handling Middleware
FacultyRouter.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Something went wrong on the server" });
});

//signup endpoint
FacultyRouter.post("/kcg/faculty/signup", function (req, res) {
  facultySignUp;
});
//Signin endpoint
FacultyRouter.post("/kcg/faculty/signin", function (req, res) {
  facultySignIn;
});
// Signout endpoint
FacultyRouter.post("/kcg/faculty/signout", function (req, res) {
  facultySignOut;
});
// Token validation endpoint
FacultyRouter.post("/tokenIsValid", function (req, res) {
  TokenValid;
});

module.exports = FacultyRouter;
