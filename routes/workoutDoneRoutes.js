const express = require('express');
const router = express.Router();
const {
    createWorkoutDone,
    updateWorkoutDone,
    deleteWorkoutDone,
    getUserWorkoutDone
} = require('../controllers/workoutDoneController');

// Create a new workout done
router.post('/', createWorkoutDone);

// Update a workout done
router.put('/:workoutDoneId', updateWorkoutDone);

// Delete a workout done
router.delete('/:workoutDoneId', deleteWorkoutDone);

// Get all workouts done from a user
router.get('/:userId', getUserWorkoutDone);

module.exports = router;