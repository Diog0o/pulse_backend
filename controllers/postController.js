const Post = require('../models/postSchema');
const User = require('../models/userSchema');
const Workout = require('../models/workoutSchema');

const createPost = async (req, res) => {
    const { user_id, content, image, workout_id, localization } = req.body;

    try {
        //Check if the user exists
        const existingUser = await User.findById(user_id);

        if (!existingUser) {
            return res.status(404).json({message: 'User does not exist'});
        }

        //Check if the workout exists
        const existingWorkout = await Workout.findById(workout_id);

        if (!existingWorkout) {
            return res.status(404).json({message: 'Workout does not exist'});
        }

        //Create a new post
        const newPost = new Post({
            user_id: user_id,
            content: content,
            image: image,
            workout_id: workout_id,
            localization: localization
        })

        await newPost.save();
        res.status(201).json({message: 'Post created successfully', post: newPost});
    }
    catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
}

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user_id').populate('workout_id');
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
}

const getPostsByUserId = async (req, res) => {
    const { user_id } = req.params;

    try {
        const posts = await Post.find({user_id: user_id}).populate('user_id').populate('workout_id');
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
}

const getPostsByWorkoutId = async (req, res) => {
    const {workout_id} = req.params;

    try {
        const posts = await Post.find({workout_id: workout_id}).populate('user_id').populate('workout_id');
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
}

const deletePost = async (req, res) => {
    const { post_id } = req.params;

    try {
        const post = await Post.findById(post_id);

        if (!post) {
            return res.status(404).json({message: 'Post does not exist'});
        }

        await Post.findByIdAndDelete(post_id);
        res.status(200).json({message: 'Post deleted successfully'});
    }
    catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
}

const updatePost = async (req, res) => {
    const { post_id } = req.params;
    const { content, image } = req.body;

    try {
        const post = await Post.findById(post_id);

        if (!post) {
            return res.status(404).json({message: 'Post does not exist'});
        }

        post.content = content;
        post.image = image;

        await post.save();
        res.status(200).json({message: 'Post updated successfully'});
    }
    catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
}

module.exports = {
    createPost,
    getAllPosts,
    getPostsByUserId,
    getPostsByWorkoutId,
    deletePost,
    updatePost
}
