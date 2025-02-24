const express = require("express");
const router = express.Router();
const {
  createAchievment,
  getAchievmentsByUser,
  deleteAchievment,
} = require("../controllers/achievmentController");
const { validateAchievment } = require("../middleware/validator");
const { validationResult } = require("express-validator");

//Create a new achievment
router.post(
  "/",
  validateAchievment,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createAchievment
);

//Get all achievments by user
router.get("/:user_id", getAchievmentsByUser);

//Delete an achievment
router.delete("/:achievment_id", deleteAchievment);

module.exports = router;
