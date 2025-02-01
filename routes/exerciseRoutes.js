const express = require('express');
const router = express.Router();

const {
    createExercise,
    updateExercise,
    deleteExercise,
    getExercise,
    getAllExercises
} = require('../controllers/exerciseController');

//Create a new exercise
router.post('/create', createExercise);

//Update an exercise
router.put('/:exerciseId', updateExercise);

//Delete an exercise
router.delete('/:exerciseId', deleteExercise);

//Get one specific exercise
router.get('/:exerciseId', getExercise);

//Get all exercises
router.get('/', getAllExercises);

module.exports = router;