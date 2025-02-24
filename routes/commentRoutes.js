const express = require("express");
const router = express.Router();
const {
  createComment,
  deleteComment,
  updateComment,
  getPostComments,
} = require("../controllers/commentController");

const { validateComment } = require("../middleware/validator");
const { validationResult } = require("express-validator");

//create a new comment
router.post(
  "/create",
  validateComment,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createComment
);

//delete a comment
router.delete("/:comment_id", deleteComment);

//update a comment
router.put(
  "/:comment_id",
  validateComment,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  updateComment
);

//get all comments for a post
router.get("/:post_id", getPostComments);

module.exports = router;
