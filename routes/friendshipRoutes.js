const express = require("express");
const router = express.Router();

const {
  followUser,
  acceptFollowRequest,
  rejectFollowRequest,
  removeFollow,
  getFollowers,
  getFollowing,
} = require("../controllers/friendshipController");

// Follow a user
router.post("/follow", followUser);

// Accept follow request
router.put("/accept", acceptFollowRequest);

// Reject follow request
router.put("/reject", rejectFollowRequest);

// Remove follow
router.delete("/remove", removeFollow);

// Get followers
router.get("/followers/:user_id", getFollowers);

// Get following
router.get("/following/:user_id", getFollowing);

module.exports = router;
