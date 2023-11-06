//Handlers
const express = require("express");

const { getUserData } = require("../../Handler/Student/StudentDataHandler");
// Router
const {verifyTokenAndAuthorization} = require("../../../middleware/Authentication");

// INIT
const StudentRouter = express.Router();

// get user data
StudentRouter.get("/", verifyTokenAndAuthorization, async function (req, res) {
  // return res.json(msg: "Hello")
  await getUserData(req, res);
});

module.exports = StudentRouter;
