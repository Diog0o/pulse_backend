const Exercise = require("../models/exerciseSchema");

const createExercise = async (req, res) => {
  const { name, description, group, gifUrl } = req.body;

  try {
    const exercise = await Exercise.findOne({ name: name });
    if (exercise) {
      return res.status(400).json({ message: "The exercise already exists" });
    }

    const newExercise = new Exercise({
      name: name,
      description: description,
      group: group,
      gifUrl: gifUrl,
    });

    await newExercise.save();

    res.status(200).json({ newExercise });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const updateExercise = async (req, res) => {
  const exerciseId = req.params.exerciseId;
  const { name, description, group, gifUrl } = req.body;

  try {
    const updatedExercise = await Exercise.findByIdAndUpdate(
      exerciseId,
      { name, description, group, gifUrl },
      { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedExercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    res.status(200).json({ updatedExercise });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteExercise = async (req, res) => {
  const exerciseId = req.params.exerciseId;

  try {
    const deleteExercise = await Exercise.findByIdAndDelete(exerciseId);

    if (!deleteExercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    res.status(200).json({ message: "Exercise Deleted Sucessfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getExercise = async (req, res) => {
  const exerciseId = req.params.exerciseId;

  try {
    const exercise = await Exercise.findById(exerciseId);

    if (!exercise) {
      return res.status(404).json({ message: "Exercise was not found" });
    }

    res.status(200).json({ exercise });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();

    res.status(200).json({ exercises });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createExercise,
  updateExercise,
  deleteExercise,
  getExercise,
  getAllExercises,
};
