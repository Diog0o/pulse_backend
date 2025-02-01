const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    exercises: [
        {
            exerciseId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Exercise',
                required: true
            },
            sets: {
                type: Number,
                required: true
            },
            reps: {
                type: Number,
                required: true
            },
            weight: {
                type: Number,
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String
    }
});

module.exports =  mongoose.model('Workout', workoutSchema);