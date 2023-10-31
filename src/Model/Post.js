const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    trim: true,
  },
  dp: {
    required: true,
    type: String,
  },
  image_url: {
    required: true,
    type: String,
  },
  likes: [
    {
      type: String,
      default: "",
    },
  ],
  description: {
    required: true,
    type: String,
  },
  title: {
    required: true,
    type: String,
  },
  link: {
    type: String,
    default: "",
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
