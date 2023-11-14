// Packages
const express = require("express");

const {
  studentSignIn,
  studentSignUp,
  studentSignOut,
  TokenValid,
  getAllStudentData,
  UpdateFcmToken,
  searchStudentByName
} = require("../../Handler/Student/StudentAuthHandler");

const {
  addFollowers,
  removeFromFollowing,
  addFollowing,
  removeFromfollowers,
  getFollowersCount,
  getFollowingCount,
  getFollowers,
  getFollowing
} = require("../FollowingorFollowers/FollowingORFollowers.js")
// INIT
const StudentRouter = express.Router();

// Error Handling Middleware
StudentRouter.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Something went wrong on the server" });
});

//signup endpoint
//resently changed
StudentRouter.post("/kcg/student/signups", async function (req, res) {
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
//Get All Student 
StudentRouter.get("/students/search", searchStudentByName, async function (req, res) {
  await searchStudentByName(req, res);
});

StudentRouter.post("/students/addfollowers", async function (req, res) {
  const { studentId, followerId } = req.body; // Assuming the IDs are sent in the request body
  const result = await addFollowers(studentId, followerId);
  if (result) {
    res.status(200).json({ message: "Follower added successfully" });
  } else {
    res.status(400).json({ message: "Failed to add follower" });
  }
});


StudentRouter.post("/students/addFollowing", async function (req, res) {
  const { studentId, followingId } = req.body; // Assuming the IDs are sent in the request body
  const result = await addFollowing(studentId, followingId);
  if (result) {
    res.status(200).json({ message: "Following added successfully" });
  } else {
    console.error("Error")
    res.status(400).json({ message: "Failed to add follower" });
  }
});

StudentRouter.post("/students/removeFromFollowing", async function (req, res) {
  const { studentId, followingId } = req.body; // Assuming the IDs are sent in the request body
  const removed = await removeFromFollowing(studentId, followingId);
if (removed) {
    console.log('Student removed from following successfully.');
    res.status(200).json({ message: "Student removed from following successfully." });
} else {
  
  console.error("Error")
  res.status(400).json({ message: "Failed to remove student from following." });
    console.log('Failed to remove student from following.');
}
});

StudentRouter.post("/students/removeFromfollowers", async function (req, res) {
  const { studentId, followersId } = req.body; // Assuming the IDs are sent in the request body
  const removed = await removeFromfollowers(studentId, followersId);
if (removed) {
    console.log('Student removed from followers successfully.');
    res.status(200).json({ message: "Student removed from followers successfully." });
} else {
  
  console.error("Error")
  res.status(400).json({ message: "Failed to remove student from followers." });
    console.log('Failed to remove student from followers.');
}
});

// Endpoint to get total followers count for a student
StudentRouter.get("/students/followersCount/:studentId", async function (req, res) {
  const studentId = req.params.studentId;
  const followersCount = await getFollowersCount(studentId);
  res.status(200).json({ followersCount });
});

// Endpoint to get total following count for a student
StudentRouter.get("/students/followingCount/:studentId", async function (req, res) {
  const studentId = req.params.studentId;
  const followingCount = await getFollowingCount(studentId);
  res.status(200).json({ followingCount });
});

StudentRouter.get("/students/getFollowers/:studentId", async function (req, res) {
  const studentId = req.params.studentId;
  const followers = await getFollowers(studentId);
  res.status(200).json({ followers });
});

StudentRouter.get("/students/getFollowing/:studentId", async function (req, res) {
  const studentId = req.params.studentId;
  const following = await getFollowing(studentId);
  res.status(200).json({ following });
});
module.exports = StudentRouter;
