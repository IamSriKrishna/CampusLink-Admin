//Handlers
const express = require("express");

const {
  getUserData,
  getAllStudentData,
  getAllStudentsNotify,
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

StudentRouter.get("/kcg/students/notify", auth, async function (req, res) {
  await getAllStudentsNotify(req, res);
});

module.exports = StudentRouter;
