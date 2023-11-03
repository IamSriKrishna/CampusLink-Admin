//Handlers
const express = require("express");
const {
  getPostData,
  createPostData,
  getPostDatabyId,
  updatePostDataById,
  deletePostDataById,
} = require("../../Handler/Post/PostDataHandler");

const auth = require("../../../middleware/Auth");
// INIT
const PostRouter = express.Router();

// get user data
PostRouter.get("/post/getAllPostData", async function (req, res) {
  // return res.json(msg: "Hello")
  await getPostData(req, res);
});

// get user data by id
PostRouter.get("/post/getPostDatabyId/:id", async function (req, res) {
  await getPostDatabyId(req, res);
});

//Create User data
PostRouter.post(
  "/post/faculty/createPostData",
  async function (req, res) {
    await createPostData(req, res);
  }
);

PostRouter.put("/post/updatePostDataById/:id", auth, async function (req, res) {
  await updatePostDataById(req, res);
});

// DELETE endpoint to delete a post by ID
PostRouter.delete("/post/delete/:id", auth, async function (req, res) {
  await deletePostDataById(req, res);
});

module.exports = PostRouter;
