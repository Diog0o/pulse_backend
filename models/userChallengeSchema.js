const mongoose = require('mongoose');

const userChallangeSchema = new mongoose.Schema({
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

    progress: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

module.exports = mongoose.model('UserChallange', userChallangeSchema);
