const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    deleteUser,
    getAllUsers,
} = require ('../controllers/userController');

//Register a new user
router.post('/register', registerUser);

//login new user
router.post('/login', loginUser);

//Get user profile
router.get('/:userId', getUserProfile);

//Update user profile
router.put('/:userId', updateUserProfile);

//Delete user
router.delete('/:userId', deleteUser);

//Get all users
router.get('/', getAllUsers);

module.exports = router;
