const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        select: false
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    refreshToken: {
        type: String,
        select: false
    },
    profile_picture: {
        type: String,
        default: 'https://static-00.iconduck.com/assets.00/profile-circle-icon-256x256-cm91gqm2.png'
    },
    bio: {
        type: String,
        default: 'No bio provided'
    },
    location: {
        type: String,
        default: 'No location provided'
    },
    workoutStats: {
        totalWorkouts: { type: Number, default: 0 },
        totalTime: { type: Number, default: 0 }, // in minutes
        totalDistance: { type: Number, default: 0 }, // in km or miles
        totalCalories: { type: Number, default: 0 } // in kcal
    }
}, { timestamps: true }); // Automatically adds `createdAt` and `updatedAt`

module.exports = mongoose.model('User', userSchema);