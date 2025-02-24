const mongoose = require('mongoose');

const userChallengeSchema = new mongoose.Schema({
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

    progress: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

module.exports = mongoose.model('UserChallenge', userChallengeSchema);
