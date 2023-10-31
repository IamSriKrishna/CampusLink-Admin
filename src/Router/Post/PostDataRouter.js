//Handlers
const express = require("express");

const {
  getPostData,
  createPostData,
} = require("../../Handler/Post/PostDataHandler");

// INIT
const PostRouter = express.Router();

// get user data
PostRouter.get("/getAllPostData/", async function (req, res) {
  // return res.json(msg: "Hello")
  await getPostData(req, res);
});

//Create User data
PostRouter.post("/createPostData/", async function (req, res) {
  await createPostData(req, res);
});
module.exports = PostRouter;
