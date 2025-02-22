const Friendship = require("../models/friendshipSchema");
const User = require("../models/userSchema");

const followUser = async (req, res) => {
  const { follower_id, following_id } = req.body;

  try {

    if (follower_id === following_id) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const follow = await Friendship.findOne({
      follower_id: follower_id,
      following_id: following_id,
    });

    if (follow) {
      return res.status(400).json({ message: "Friend request already sent" });
    }

    const newFollow = new Friendship({
      follower_id: follower_id,
      following_id: following_id,
      status: "pending",
    });

    await newFollow.save();

    res.status(200).json({ message: "Follow request sent", follow: newFollow });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const acceptFollowRequest = async (req, res) => {
  const { follower_id, following_id } = req.body;

  try {
    const follow = await Friendship.findOne({
      follower_id,
      following_id,
      status: "pending",
    });

    if (!follow) {
      return res.status(400).json({ message: "No pending follow request found" });
    }

    // Reject the follow request
    follow.status = "accepted";
    await follow.save();

    res.status(200).json({ message: "Follow request accepted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const rejectFollowRequest = async (req, res) => {
  const { follower_id, following_id } = req.body;

  try {
    const follow = await Friendship.findOne({
      follower_id,
      following_id,
      status: "pending",
    });

    if (!follow) {
      return res.status(400).json({ message: "No pending follow request found" });
    }

    // Reject the follow request
    follow.status = "rejected";
    await follow.save();

    res.status(200).json({ message: "Follow request rejected successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


const removeFollow = async (req, res) => {
  const { follower_id, following_id } = req.body;

  try {
    const follow = await Friendship.findOneAndDelete({
      follower_id: follower_id,
      following_id: following_id,
    });

    if (!follow) {
      return res.status(400).json({ message: "No follow relationship found" });
    }

    res.status(200).json({ message: "Unfollowed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getFollowers = async (req, res) => {
  const { user_id } = req.params;

  try {
    const followers = await Friendship.find({
      following_id: user_id,
      status: "accepted",
    });

    const followerIds = followers.map(follower => follower.follower_id);

    // Fetch all users in a single query
    const followersList = await User.find({ _id: { $in: followerIds } })
      .select("username email profile_picture");

    res.status(200).json({ followers: followersList });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


const getFollowing = async (req, res) => {
  const { user_id } = req.params;

  try {
    const following = await Friendship.find({
      follower_id: user_id,
      status: "accepted",
    });

    const followingIds = following.map(follow => follow.following_id);

    // Fetch all users in a single query
    const followingList = await User.find({ _id: { $in: followingIds } })
      .select("username email profile_picture");

    res.status(200).json({ following: followingList });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


module.exports = {
  followUser,
  acceptFollowRequest,
  rejectFollowRequest,
  removeFollow,
  getFollowers,
  getFollowing,
};
