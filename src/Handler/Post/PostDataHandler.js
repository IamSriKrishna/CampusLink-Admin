const PostModel = require("../../Model/Post");

const getPostData = async (req, res) => {
  try {
    const form = await PostModel.find();
    if (FormData.length === 0) {
      return res.status(404).json({ msg: "No Post data exist!" });
    }

    if (!form) {
      console.log("Form not found");
    } else {
      console.log(form);
      res.json(form);
    }
  } catch (e) {
    console.log(e)
    console.error(e);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const createPostData = async (req, res) => {
  try {
    const { name, dp, image_url, description, title, link } = req.body;
    if (!name || !dp || !image_url || !description || !title|| !link) {
      console.log('All fields are mandatory')
      return res.status(400).json({ msg: "All fields are mandatory" });
    }

    let post = new PostModel({
      name,
      dp,
      image_url,
      description,
      title,
      link,
    });
    post = await post.save();
    console.log('All fields are mandatory')
    res.status(200).json({ msg: "Post Created" });
  } catch (e) {
    console.log('error:'+e)
    console.error(e);
    res.status(500).json({ error: "Something went wrong:"+e });
  }
};

const getPostDatabyId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const post = await PostModel.findById(id);

    if (!post) {
      return res.json({ msg: "Post not found" });
    } else {
      res.json(post);
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Something went wrong" });
  }
};

const updatePostDataById = async (req, res) => {
  const postId = req.params.id; // Get the post ID from the URL
  const updateData = req.body; // Data to update the post

  try {
    // Find the post by ID and update it
    const updatedPost = await PostModel.findByIdAndUpdate(postId, updateData, {
      new: true,
    });

    if (!updatedPost) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json({ data: updatedPost, msg: "Post updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const deletePostDataById = async (req, res) => {
  const postId = req.params.id; // Get the post ID from the URL

  try {
    // Find the post by ID and remove it
    const deletedPost = await PostModel.findByIdAndRemove(postId);

    if (!deletedPost) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json({ data: deletedPost, msg: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  getPostDatabyId,
  getPostData,
  createPostData,
  updatePostDataById,
  deletePostDataById,
};
