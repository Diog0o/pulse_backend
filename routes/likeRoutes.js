const express = require('express');
const router = express.Router();
const {
  addLike,
  removeLike,
  getPostLikes,
} = require('../controllers/likeController');

// Add a like
router.post('/', addLike);

// Remove a like
router.delete('/:like_id', removeLike);

// Get all likes for a post
router.get('/:post_id', getPostLikes);

module.exports = router;
