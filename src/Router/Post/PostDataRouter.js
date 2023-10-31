//Handlers
const express = require("express");
const {
  getPostData,
  createPostData,
  getPostDatabyId,
} = require("../../Handler/Post/PostDataHandler");

const auth = require("../../../middleware/Auth");
// INIT
const PostRouter = express.Router();

// get user data
PostRouter.get("/post/getAllPostData/", auth, async function (req, res) {
  // return res.json(msg: "Hello")
  await getPostData(req, res);
});

// get user data by id
PostRouter.get("/post/getPostDatabyId/:id", auth, async function (req, res) {
  await getPostDatabyId(req, res);
});

//Create User data
PostRouter.post(
  "/post/faculty/createPostData/",
  auth,
  async function (req, res) {
    await createPostData(req, res);
  }
);

module.exports = PostRouter;
