const Workout = require('../models/workoutSchema')

const createWorkout = async (req, res) => {
    
    const { userId, exercises, notes } = req.body;

    try {
        const newWorkout = new Workout ({
            userId,
            exercises,
            notes
        });

        await newWorkout.save();

        res.status(200).json({newWorkout})
    }
    catch (error) {
        res.status(500).json({message: 'Server Error', error: error.message})
    }
}

//é preciso garantir que os exercises nao vem vazios ?
const updateWorkout = async (req, res) => {
    const workoutId = req.params.workoutId;
    const { exercises, notes } = req.body;

    try {
        const updatedWorkout = await Workout.findByIdAndUpdate(workoutId,
            {
                exercises: exercises,
                notes: notes
            },
            {new: true}
        )

        if (!updatedWorkout) {
            return res.status(404).json({message: 'Workout doesnt exist'})
        }

        res.status(200).json({updatedWorkout})
    }
    catch (error) {
        res.status(500).json({message: 'Server Error', error: error.message})
    }
}

const deleteWorkout = async (req, res) => {
    const workoutId = req.params.workoutId;

    try{
        const deletedWorkout = await Workout.findByIdAndDelete(workoutId);

        if (!deletedWorkout) {
            return res.status(404).json({message: 'Workout didnt exist'});
        }

        res.status(200).json({message: 'Workout was sucessfully deleted'});
    }
    catch (error) {
        res.status(500).json({message: 'Server Error', error: error.message});
    }
}

const getWorkout = async (req, res) => {
    const workoutId = req.params.workoutId;

    try {
        const workout = await Workout.findById(workoutId);

        if (!workout) {
            return res.status(404).json({message: 'Workout doesnt exist'});
        }

        res.status(200).json({workout});
    }
    catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
}

const getAllWorkouts = async (req, res) => {

    try{
        const workouts = await Workout.find();

        res.status(200).json({workouts});
    }
    catch (error){
        res.status(500).json({message: 'Server Error', error: error.message});
    }
}

const getWorkoutsFromUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        const workouts = await Workout.find({
            userId: userId
        })

        if(workouts.length === 0) {
            res.status(404).json({message: "No workouts found"});
        }

        res.status(200).json({workouts});
    }
    catch(error) {
        res.status(500).json({message: "Server Error", error: error.message})
    }
}

module.exports = {
    createWorkout,
    updateWorkout,
    deleteWorkout,
    getWorkout,
    getAllWorkouts,
    getWorkoutsFromUser
}