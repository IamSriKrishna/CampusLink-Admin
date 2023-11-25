//Handlers
const express = require("express");

const {
  getUserData,
  getAllStudentData,
} = require("../../Handler/Student/StudentDataHandler");
// Router
const auth = require("../../../middleware/Auth");

// INIT
const StudentRouter = express.Router();

// get user data
StudentRouter.get("/", auth, async function (req, res) {
  await getUserData({ user: req.user, token: req.token }, res);
});

StudentRouter.get("/kcg/students", auth, async function (req, res) {
  await getAllStudentData({ user: req.user, token: req.token }, res);
});

module.exports = StudentRouter;
