const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    type: {
        enum: ["like", "comment", "achievment", "challenge"],
        type: String,
        required: [true, 'Please provide a type']
    },

    content: {
        type: String,
        trim: true,
        required: [true, 'Please provide a content']
    },

    is_read: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

module.exports = mongoose.model('Notification', notificationSchema);
