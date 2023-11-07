//Handlers
const express = require("express");

const { getUserData } = require("../../Handler/Student/StudentDataHandler");
// Router
const auth = require("../../../middleware/Auth");

// INIT
const StudentRouter = express.Router();

// get user data
StudentRouter.get("/", auth, async function (req, res) {
  // return res.json(msg: "Hello")
  await getUserData({ user: req.user, token: req.token }, res);
});

module.exports = StudentRouter;
