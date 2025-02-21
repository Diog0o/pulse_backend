const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a challange name"],
        unique: true
    },

    description: {
        type: String,
        required: [true, "Please provide a description"]
    },

    start_date: {
        type: Date,
        required: [true, "Please provide a start date"]
    },

    end_date: {
        type: Date,
        required: [true, "Please provide an end date"]
    },

    goal: {
        type: String,
        required: [true, "Please provide a goal"]
    },
    ///potentialy create medals as a reward for the challanges
    reward: {
        type: String,
        required: [true, "Please provide a reward"]
    }
}, {timestamps: true})

module.exports = mongoose.model('Challenge', challengeSchema);
