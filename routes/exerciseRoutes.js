const express = require('express');
const router = express.Router();

const {
    createExercise,
    updateExercise,
    deleteExercise,
    getExercise,
    getAllExercises
} = require('../controllers/exerciseController');
const { validateExercise } = require('../middleware/validator')
const { validationResult } = require("express-validator");

//Create a new exercise
router.post("/create", validateExercise, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }, createExercise);

//Update exercise 
router.put('/:exerciseId', validateExercise, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, updateExercise);

//Delete an exercise
router.delete('/:exerciseId', deleteExercise);

//Get one specific exercise
router.get('/:exerciseId', getExercise);

//Get all exercises
router.get('/', getAllExercises);

module.exports = router;