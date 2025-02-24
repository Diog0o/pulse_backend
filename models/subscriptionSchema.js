const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    plan: {
        type: String,
        enum: ["free", "premium"],
        default: "free"
    },

    start_date: {
        type: Date,
        default: Date.now
    },

    end_date: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true})

module.exports = mongoose.model('Subscription', subscriptionSchema);
