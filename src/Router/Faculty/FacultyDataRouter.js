//Handlers
const express = require("express");

const { getFacultyData } = require("../../Handler/Faculty/FacultyDataHandler");
// Router
const auth = require("../../../middleware/Auth");

// INIT
const FacultyRouter = express.Router();

// get user data
FacultyRouter.get("/FacultyData/", auth, async function (req, res) {
  // return res.json(msg: "Hello")
  await getFacultyData(req, res);
});

module.exports = FacultyRouter;
