const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    content: {
        type: String,
        trim: true,
        required: [true, 'Please provide a content']
    },

    image: {
        type: String
    },

    workout_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout',
    },

    created_at: {
        type: Date,
        default: Date.now
    }
})