const mongoose = require('mongoose');

const workoutDoneSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    workoutId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout',
        required: true
    },
    
    time: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    localization: {
        type: String,
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
},{timestamps: true});

module.exports =  mongoose.model('WorkoutDone', workoutDoneSchema);

