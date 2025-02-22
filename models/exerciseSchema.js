const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Please provide a description']
    },
    group: {
        type: String,
        required: true,
        enum: ['Bicep', 'Back', 'Shoulder', 'Chest', 'Calve', 'Hamstring', 'Tricep', 'Leg', 'Abs', 'Glute', 'Cardio', 'Other']
    },
    gifUrl: {
        type: String,
        required: [true, 'Please provide a GIF URL']
    }
}, {timestamps: true});

module.exports = mongoose.model('Exercise', exerciseSchema);
