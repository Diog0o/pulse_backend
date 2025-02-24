const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostsByUserId,
  getPostsByWorkoutId,
  deletePost,
  updatePost,
} = require("../controllers/postController");

const { validatePost } = require("../middleware/validator");
const { validationResult } = require("express-validator");

//create a new post
router.post(
  "/",
  validatePost,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createPost
);

//Get all posts
router.get("/", getAllPosts);

//Get posts by user id
router.get("/user/:user_id", getPostsByUserId);

//Get posts by workout id
router.get("/workout/:workout_id", getPostsByWorkoutId);

//Delete post
router.delete("/:post_id", deletePost);

//Update post
router.put(
  "/:post_id",
  validatePost,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  updatePost
);

module.exports = router;
