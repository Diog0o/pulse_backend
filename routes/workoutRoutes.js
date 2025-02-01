const express = require('express')
const router = express.Router();

const {
    createWorkout,
    updateWorkout,
    deleteWorkout,
    getWorkout,
    getAllWorkouts
} = require('../controllers/workoutController')

//create workout
router.post('/create', createWorkout);

//delete workout
router.delete('/:workoutId', deleteWorkout);

//update workout
router.put('/:workoutId', updateWorkout);

//get workout
router.get('/:workoutId', getWorkout);

//get all workouts
router.get('/', getAllWorkouts);

module.exports = router;