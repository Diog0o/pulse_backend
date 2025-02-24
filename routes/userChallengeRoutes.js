const express = require("express");
const router = express.Router();
const {
  createUserChallenge,
  getUserChallenges,
  updateUserChallenge,
  deleteUserChallenge,
} = require("../controllers/userChallengeController");

const { validateUserChallenge } = require("../middleware/validator");
const { validationResult } = require("express-validator");

// Create a new user challenge
router.post(
  "/",
  validateUserChallenge,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createUserChallenge
);

// Get all user challenges
router.get("/:user_id", getUserChallenges);

// Update a user challenge
router.put(
  "/:user_id/:challenge_id",
  validateUserChallenge,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  updateUserChallenge
);

// Delete a user challenge
router.delete("/:user_id/:challenge_id", deleteUserChallenge);

module.exports = router;
