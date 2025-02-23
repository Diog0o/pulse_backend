const express = require('express');
const router = express.Router();
const {
    createAchievment,
    getAchievmentsByUser,
    deleteAchievment
} = require('../controllers/achievmentController');

//Create a new achievment
router.post('/', createAchievment);

//Get all achievments by user
router.get('/:user_id', getAchievmentsByUser);

//Delete an achievment
router.delete('/:achievment_id', deleteAchievment);

module.exports = router;
