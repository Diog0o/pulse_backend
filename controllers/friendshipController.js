const Friendship = require("../models/friendshipSchema");
const User = require("../models/userSchema");

const followUser = async (req, res) => {
  const { follower_id, following_id } = req.body;

  try {
    const follow = await Friendship.findOne({
      follower_id: follower_id,
      following_id: following_id,
    });

    if (follow) {
      return res.status(400).json({ message: "Already following" });
    }

    const newFollow = new Friendship({
      follower_id: follower_id,
      following_id: following_id,
      status: "pending",
    });

    res.status(200).josn({ message: "Follow request sent", follow: newFollow });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const acceptFollowRequest = async (req, res) => {
  const { follower_id, following_id } = req.body;

  try {
    const follow = await Friendship.findOne({
      follower_id: follower_id,
      following_id: following_id,
    });

    if (!follow) {
      return res.status(400).json({ message: "No follow request was found" });
    }

    if (follow.status === "accepted") {
      return res.status(400).json({ message: "Already accepted" });
    }

    if (follow.status === "rejected") {
      return res.status(400).json({ message: "Follow request was rejected" });
    }

    follow.status = "accepted";
    await follow.save();
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const rejectFollowRequest = async (req, res) => {
  const { follower_id, following_id } = req.body;

  try {
    const follow = await Friendship.findOne({
      follower_id: follower_id,
      following_id: following_id,
    });

    if (!follow) {
      return res.status(400).json({ message: "No follow request was found" });
    }

    if (follow.status === "rejected") {
      return res.status(400).json({ message: "Already rejected" });
    }

    if (follow.status === "accepted") {
      return res.status(400).json({ message: "Follow request was accepted" });
    }

    follow.status = "rejected";
    await follow.save();
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
      return res.status(400).json({ message: "No follow request was found" });
    }

    res.status(200).json({ message: "Follow request was removed" });
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

    // Fetch user details in parallel using Promise.all
    const followersList = await Promise.all(
      followers.map(async (follower) => {
        return await User.findById(follower.follower_id).select(
          "username email profile_picture"
        );
      })
    );

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

    // Fetch user details in parallel using Promise.all
    const followingList = await Promise.all(
      following.map(async (follow) => {
        return await User.findById(follow.following_id).select(
          "username email profile_picture"
        );
      })
    );

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
