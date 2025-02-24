const express = require("express");
const router = express.Router();
const {
  addLike,
  removeLike,
  getPostLikes,
} = require("../controllers/likeController");

const { validateLike } = require("../middleware/validator");
const { validationResult } = require("express-validator");

// Add a like
router.post(
  "/",
  validateLike,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  addLike
);

// Remove a like
router.delete("/:like_id", removeLike);

// Get all likes for a post
router.get("/:post_id", getPostLikes);

module.exports = router;
