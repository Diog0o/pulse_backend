const express = require("express");
const router = express.Router();
const {
  createComment,
  deleteComment,
  updateComment,
  getPostComments,
} = require("../controllers/commentController");

//create a new comment
router.post("/create", createComment);

//delete a comment
router.delete("/:comment_id", deleteComment);

//update a comment
router.put("/:comment_id", updateComment);

//get all comments for a post
router.get("/:post_id", getPostComments);

module.exports = router;
