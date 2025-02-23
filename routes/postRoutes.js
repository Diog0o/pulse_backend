const express = require('express');
const router = express.Router();
const {
    createPost,
    getAllPosts,
    getPostsByUserId,
    getPostsByWorkoutId,
    deletePost,
    updatePost
} = require('../controllers/postController');

//create a new post
router.post('/', createPost);

//Get all posts
router.get('/', getAllPosts);

//Get posts by user id
router.get('/user/:user_id', getPostsByUserId);

//Get posts by workout id
router.get('/workout/:workout_id', getPostsByWorkoutId);

//Delete post
router.delete('/:post_id', deletePost);

//Update post
router.put('/:post_id', updatePost);

module.exports = router;