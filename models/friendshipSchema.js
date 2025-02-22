const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
    follower_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    following_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
}, {timestamps: true})

module.exports = mongoose.model('Friendship', friendshipSchema);