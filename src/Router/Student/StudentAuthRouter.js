// Packages
const express = require("express");

const {
  studentSignIn,
  studentSignUp,
  studentSignOut,
  TokenValid,
  getAllStudentData,
  UpdateFcmToken,
  searchStudentByName,
} = require("../../Handler/Student/StudentAuthHandler");

const {
  addFollowers,
  removeFromFollowing,
  addFollowing,
  removeFromfollowers,
  getFollowersCount,
  getFollowingCount,
  getFollowers,
  getFollowing,
} = require("../FollowingorFollowers/FollowingORFollowers.js");
// INIT
const StudentRouter = express.Router();

// Error Handling Middleware
StudentRouter.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Something went wrong on the server" });
});

//signup endpoint
StudentRouter.post("/kcg/student/signup123", async function (req, res) {
  await studentSignUp(req, res);
});
//Signin endpoint
StudentRouter.post("/kcg/student/signin", async function (req, res) {
  await studentSignIn(req, res);
});
// Signout endpoint
StudentRouter.post("/kcg/student/signout", async function (req, res) {
  await studentSignOut(req, res);
});
// Token validation endpoint
StudentRouter.post("/tokenIsValid", async function (req, res) {
  await TokenValid(req, res);
});
// Update FCM Token
StudentRouter.put("/kcg/student/fcm-token/:id", async function (req, res) {
  await UpdateFcmToken(req, res);
});
//Get All Student
StudentRouter.get("/kcg/student/getAllStudentData", async function (req, res) {
  await getAllStudentData(req, res);
});
//Get Student Search
StudentRouter.get(
  "/students/search",
  searchStudentByName,
  async function (req, res) {
    await searchStudentByName(req, res);
  }
);

module.exports = StudentRouter;
