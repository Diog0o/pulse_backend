const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getAllUsers,
} = require("../controllers/userController");

const { validateUser } = require("../middleware/validator");
const { validationResult } = require("express-validator");

//Register a new user
router.post(
  "/register",
  validateUser,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  registerUser
);

//login new user
router.post("/login", loginUser);

//Get user profile
router.get("/:userId", getUserProfile);

//Update user profile
router.put(
  "/:userId",
  validateUser,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  updateUserProfile
);

//Delete user
router.delete("/:userId", deleteUser);

//Get all users
router.get("/", getAllUsers);

router.get("/me", authenticateUser, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;
