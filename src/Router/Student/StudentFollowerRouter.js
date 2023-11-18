// Packages
const express = require("express");

const {
  addFollowers,
  removeFromfollowers,
  getFollowersCount,
  getFollowers,
} = require("../../Handler/Student/StudentFollowerHandler");

// INIT
const StudentFollowerRouter = express.Router();

StudentFollowerRouter.post("/students/addfollowers", async function (req, res) {
    const { studentId, followerId } = req.body; // Assuming the IDs are sent in the request body
    const result = await addFollowers(studentId, followerId);
    if (result) {
      res.status(200).json({ message: "Follower added successfully" });
    } else {
      res.status(400).json({ message: "Failed to add follower" });
    }
});

StudentFollowerRouter.post("/students/removeFromfollowers", async function (req, res) {
const { studentId, followersId } = req.body; // Assuming the IDs are sent in the request body
const removed = await removeFromfollowers(studentId, followersId);
if (removed) {
    console.log("Student removed from followers successfully.");
    res
    .status(200)
    .json({ message: "Student removed from followers successfully." });
} else {
    console.error("Error");
    res
    .status(400)
    .json({ message: "Failed to remove student from followers." });
    console.log("Failed to remove student from followers.");
}
});
  
// Endpoint to get total followers count for a student
StudentFollowerRouter.get(
    "/students/followersCount/:studentId",
    async function (req, res) {
      const studentId = req.params.studentId;
      const followersCount = await getFollowersCount(studentId);
      res.status(200).json({ followersCount });
    }
  );
  
StudentFollowerRouter.get(
"/students/getFollowers/:studentId",
async function (req, res) {
    const studentId = req.params.studentId;
    const followers = await getFollowers(studentId);
    res.status(200).json({ followers });
}
);

module.exports = StudentFollowerRouter;