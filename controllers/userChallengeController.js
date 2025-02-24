const UserChallange = require("../models/userChallengeSchema");
const User = require("../models/userSchema");
const Challenge = require("../models/challengeSchema");

const createUserChallenge = async (req, res) => {
  const { user_id, challenge_id } = req.body;

  try {
    const existingUserChallenge = await UserChallange.findOne({
      user_id: user_id,
      challenge_id: challenge_id,
    });

    if (existingUserChallenge) {
      return res.status(400).json({ message: "User challenge already exists" });
    }

    const newUserChallenge = new UserChallange({
      user_id: user_id,
      challenge_id: challenge_id,
    });

    await newUserChallenge.save();
    res.status(201).json(newUserChallenge);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserChallenges = async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userChallenges = await UserChallange.find({ user_id: user_id });
    res.status(200).json(userChallenges);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateUserChallenge = async (req, res) => {
  const user_id = req.params.user_id;
  const challenge_id = req.params.challenge_id;
  const { progress } = req.body;

  try {
    const existingUser = await User.findById(user_id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingChallenge = await Challenge.findById(challenge_id);
    if (!existingChallenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    const updatedUserChallenge = await UserChallange.findOneAndUpdate(
      { user_id: user_id, challenge_id: challenge_id },
      { progress: progress },
      { new: true, runValidators: true }
    );

    if (!updatedUserChallenge){
      return res.status(404).json({ message: "User challenge not found" });
    }

    res.status(200).json(updatedUserChallenge);

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteUserChallenge = async (req, res) => {
  const user_id = req.params.user_id;
  const challenge_id = req.params.challenge_id;

  try {
    const existingUser = await User.findById(user_id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingChallenge = await Challenge.findById(challenge_id);
    if (!existingChallenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    const deletedUserChallenge = await UserChallange.findOneAndDelete({
      user_id: user_id,
      challenge_id: challenge_id,
    });

    if (!deletedUserChallenge) {
      return res.status(404).json({ message: "User challenge not found" });
    }

    res.status(200).json({ message: "User challenge deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createUserChallenge,
  getUserChallenges,
  updateUserChallenge,
  deleteUserChallenge,
};
