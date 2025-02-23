const Like = require("../models/likeSchema");
const Post = require("../models/postSchema");
const User = require("../models/userSchema");

const addLike = async (req, res) => {
  const { user_id, post_id } = req.body;

  try {
    const existingUser = await User.findById(user_id);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found." });
    }

    const existingPost = await Post.findById(post_id);
    if (!existingPost) {
      return res.status(404).json({ message: "Post not found." });
    }

    const existingLike = await Like.findOne({
      user_id: user_id,
      post_id: post_id,
    });

    if (existingLike) {
      return res.status(400).json({ message: "Post already liked." });
    }

    const newLike = new Like({
      user_id: user_id,
      post_id: post_id,
    });

    await newLike.save();
    res.status(201).json(newLike);
  } catch (error) {
    res.statud(500).json({ message: error.message });
  }
};

const removeLike = async (req, res) => {
  const like_id = req.params.like_id;

  try {
    const existingLike = await Like.findById(like_id);

    if (!existingLike) {
      return res.status(404).json({ message: "Like not found." });
    }

    await Like.findByIdAndDelete(like_id);
    res.status(200).json({ message: "Like removed." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPostLikes = async (req, res) => {
  const post_id = req.params.post_id;

  try {
    const existingPost = await Post.findById(post_id);

    if (!existingPost) {
      return res.status(404).json({ message: "Post not found." });
    }

    const likes = await Like.find({ post_id: post_id });
    res.status(200).json(likes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addLike, removeLike, getPostLikes };
