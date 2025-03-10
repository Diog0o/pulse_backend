const express = require("express");
const router = express.Router();
const {
  loginUser,
  logoutUser,
  refreshToken,
  getUserFromToken,
} = require("../controllers/authController");

//Login user
router.post("/login", loginUser);

//Logout user
router.post("/logout", logoutUser);

//Refresh token
router.post("/refresh", refreshToken);

//Get user from token
router.get("/me", getUserFromToken);

module.exports = router;
