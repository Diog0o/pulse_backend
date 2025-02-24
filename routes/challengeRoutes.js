const express = require("express");
const router = express.Router();
const {
  createChallenge,
  getChallenges,
  deleteChallenge,
  updateChallenge,
} = require("../controllers/challengeController");
const { validateChallenge } = require("../middleware/validator");
const { validationResult } = require("express-validator");

// Create a new challenge
router.post(
  "/",
  validateChallenge,
  (req, res, next) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ errors: erros.array() });
    }
    next();
  },
  createChallenge
);

// Get all challenges
router.get("/", getChallenges);

// Delete a challenge
router.delete("/:challenge_id", deleteChallenge);

// Update a challenge
router.put(
  "/:challenge_id",
  validateChallenge,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  updateChallenge
);

module.exports = router;
