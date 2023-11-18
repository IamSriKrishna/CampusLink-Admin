const {
getFollowing,
getFollowingCount,
addFollowing,
removeFromFollowing,
} = require("../../Handler/Student/StudentFollowingHandler")

// INIT
const StudentFollowingRouter = express.Router();

StudentFollowingRouter.post("/students/addFollowing", async function (req, res) {
    const { studentId, followingId } = req.body; // Assuming the IDs are sent in the request body
    const result = await addFollowing(studentId, followingId);
    if (result) {
      res.status(200).json({ message: "Following added successfully" });
    } else {
      console.error("Error");
      res.status(400).json({ message: "Failed to add follower" });
    }
});

StudentFollowingRouter.post("/students/removeFromFollowing", async function (req, res) {
const { studentId, followingId } = req.body; // Assuming the IDs are sent in the request body
const removed = await removeFromFollowing(studentId, followingId);
if (removed) {
    console.log("Student removed from following successfully.");
    res
    .status(200)
    .json({ message: "Student removed from following successfully." });
} else {
    console.error("Error");
    res
    .status(400)
    .json({ message: "Failed to remove student from following." });
    console.log("Failed to remove student from following.");
}
});

// Endpoint to get total following count for a student
StudentFollowingRouter.get(
    "/students/followingCount/:studentId",
    async function (req, res) {
      const studentId = req.params.studentId;
      const followingCount = await getFollowingCount(studentId);
      res.status(200).json({ followingCount });
    }
);

StudentFollowingRouter.get(
    "/students/getFollowing/:studentId",
    async function (req, res) {
      const studentId = req.params.studentId;
      const following = await getFollowing(studentId);
      res.status(200).json({ following });
    }
);

module.exports = StudentFollowingRouter;