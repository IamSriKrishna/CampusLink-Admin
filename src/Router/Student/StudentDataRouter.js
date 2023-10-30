//Handlers
const { getUserData } = require("../../Handler/Student/StudentDataHandler");
// Router
const auth = require("../../../middleware/Auth");

// get user data
StudentRouter.get("/", auth, async function (req, res) {
  await getUserData(req, res);
});
