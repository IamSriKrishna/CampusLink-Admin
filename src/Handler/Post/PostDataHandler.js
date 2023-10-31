const PostModel = require("../../Model/Post");

const getPostData = async (req, res) => {
  try {
    const user = await PostModel.find();
    if (user.length === 0) {
      return res.status(404).json({ msg: "No Post data exist!" });
    }

    const postsData = user.map((post) => ({
      ...post._doc,
      token: req.token,
    }));

    res.json({ data: postsData });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const createPostData = async (req, res) => {
  try {
    const { name, dp, image_url, description, title, link } = req.body;
    if (!name || !dp || !image_url || !description || !title) {
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
    res.status(200).json({ msg: "Post Created" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getPostDatabyId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const post = await PostModel.findById(id);

    if (!post) {
      console.log("Post not found");
    } else {
      res.json(post);
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Something went wrong" });
  }
};
module.exports = {
  getPostDatabyId,
  getPostData,
  createPostData,
};
