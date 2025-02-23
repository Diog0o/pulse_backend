const express = require("express");
const router = express.Router();
const {
  createUserChallenge,
  getUserChallenges,
  updateUserChallenge,
  deleteUserChallenge
} = require("../controllers/userChallengeController");

// Create a new user challenge
router.post("/", createUserChallenge);

// Get all user challenges
router.get("/:user_id", getUserChallenges);

// Update a user challenge
router.put("/:user_id/:challenge_id", updateUserChallenge);

// Delete a user challenge
router.delete("/:user_id/:challenge_id", deleteUserChallenge);

module.exports = router;
