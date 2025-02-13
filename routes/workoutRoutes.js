const express = require('express')
const router = express.Router();

const {
    createWorkout,
    updateWorkout,
    deleteWorkout,
    getWorkout,
    getAllWorkouts,
    getWorkoutsFromUser
} = require('../controllers/workoutController')

const { validateWorkout } = require('../middleware/validator');
const { validationResult } = require('express-validator');

//create workout
router.post('/create', validateWorkout, (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, createWorkout);

//delete workout
router.delete('/:workoutId', deleteWorkout);

//update workout
router.put('/:workoutId', validateWorkout, (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, updateWorkout);

//get all workouts
router.get('/all', getAllWorkouts);

//get workouts from user
router.get('/user/:userId', getWorkoutsFromUser)

//get workout
router.get('/:workoutId', getWorkout);

module.exports = router;