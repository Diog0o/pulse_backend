const mongoose = require('mongoose');

const achievmentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    challange_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challange',
        required: true
    },

    earned_at: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true})

module.exports = mongoose.model('Achievment', achievmentSchema);
