// Packages
const express = require("express");

const {
  facultySignIn,
  facultySignUp,
  facultySignOut,
  TokenValid,
} = require("../../Handler/Faculty/FacultyAuthHandler");

// INIT
const FacultyRouter = express.Router();

// Error Handling Middleware
FacultyRouter.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Something went wrong on the server" });
});

//signup endpoint
FacultyRouter.post("/kcg/faculty/signup", async function (req, res) {
  await facultySignUp(req, res);
});
//Signin endpoint
FacultyRouter.post("/kcg/faculty/signin", async function (req, res) {
  await facultySignIn(req, res);
});
// Signout endpoint
FacultyRouter.post("/kcg/faculty/signout", async function (req, res) {
  await facultySignOut(req, res);
});
// Token validation endpoint
FacultyRouter.post("/kcg/faculty/tokenIsValid", async function (req, res) {
  await TokenValid(req, res);
});

module.exports = FacultyRouter;
