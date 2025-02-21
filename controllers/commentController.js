const Comment = require("../models/commentModel");
const User = require("../models/userModel");
const Post = require("../models/postModel");

const createComment = async (req, res) => {
  const { user_id, post_id, content } = req.body;

  try {
    //Check if user exists
    const existingUser = await User.findById(user_id);
    if (!existingUser)
      return res.status(404).json({ message: "User does not exist" });

    //Check if post exists
    const existingPost = await Post.findById(post_id);
    if (!existingPost)
      return res.status(404).json({ message: "Post does not exist" });

    //Create comment
    const newComment = new Comment({
      user_id: user_id,
      post_id: post_id,
      content: content,
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteComment = async (req, res) => {
  const comment_id = req.params.comment_id;

  try {
    const existingComment = await Comment.findById(comment_id);
    if (!existingComment)
      return res.status(404).json({ message: "Comment does not exist" });

    await Comment.findByIdAndDelete(comment_id);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateComment = async (req, res) => {
  const comment_id = req.params.comment_id;
  const { content } = req.body;

  try {
    const existingComment = await Comment.findById(comment_id);

    if (!existingComment) {
      return res.status(404).json({ message: "Comment does not exist" });
    }

    existingComment.content = content;
    await existingComment.save();
    res.status(200).json(existingComment);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getPostComments = async (req, res) => {
  const post_id = req.params.post_id;

  try {
    const comments = await Comment.find({ post_id });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createComment,
  deleteComment,
  updateComment,
  getPostComments,
};
