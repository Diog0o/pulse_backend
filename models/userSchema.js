const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        requiered: [true, 'Please provide a username'],
        unique: true
    },
    password: {
        type: String,
        requiered: [true, 'Please provide a password']
    },
    email: {
        type: String,
        requiered: [true, 'Please provide an email'],
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);