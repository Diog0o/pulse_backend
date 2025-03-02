const WorkoutDone = require("../models/workoutDoneSchema");
const User = require("../models/userSchema");
const Exercise = require("../models/exerciseSchema");

const createWorkoutDone = async (req, res) => {
  const { userId, time, group, date, localization, exercises } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const exercisesIds = exercises.map((exercise) => exercise.exerciseId);
    const exercisesFound = await Exercise.find({ _id: { $in: exercisesIds } });
    if (exercisesFound.length !== exercisesIds.length) {
      return res.status(404).json({ message: "Exercise not found" });
    }
    const workoutDone = new WorkoutDone({
      userId,
      time,
      group,
      date,
      localization,
      exercises,
    });
    await workoutDone.save();
    res.status(201).json(workoutDone);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const updateWorkoutDone = async (req, res) => {
  const workoutDoneId = req.params.workoutDoneId;
  const { time, group, date, localization, exercises } = req.body;
  try {
    const workoutDone = await WorkoutDone.findByIdAndUpdate(
      workoutDoneId,
      { time, group, date, localization, exercises },
      { new: true }
    );
    if (!workoutDone) {
      return res.status(404).json({ message: "WorkoutDone not found" });
    }
    res.status(200).json(workoutDone);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const deleteWorkoutDone = async (req, res) => {
  const workoutDoneId = req.params.workoutDoneId;
  try {
    const workoutDone = await WorkoutDone.findByIdAndDelete(workoutDoneId);
    if (!workoutDone) {
      return res.status(404).json({ message: "WorkoutDone not found" });
    }
    res.status(200).json({ message: "WorkoutDone was successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getUserWorkoutDone = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const workoutDone = await WorkoutDone.find({ userId }).sort({ date: -1 });
    res.status(200).json(workoutDone);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  createWorkoutDone,
  updateWorkoutDone,
  deleteWorkoutDone,
  getUserWorkoutDone,
};
