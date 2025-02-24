const mongoose = require('mongoose');

const achievmentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    challenge_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challenge',
        required: true
    },

    earned_at: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true})

module.exports = mongoose.model('Achievment', achievmentSchema);
