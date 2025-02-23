const express = require("express");
const router = express.Router();
const {
  createChallenge,
  getChallenges,
  deleteChallenge,
  updateChallenge,
} = require("../controllers/challengeController");

// Create a new challenge
router.post("/", createChallenge);

// Get all challenges
router.get("/", getChallenges);

// Delete a challenge
router.delete("/:challenge_id", deleteChallenge);

// Update a challenge
router.put("/:challenge_id", updateChallenge);

module.exports = router;
