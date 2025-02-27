const User = require("../models/userSchema");
const bcrypt = require("bcrypt");


const createUser = async (req, res) => {
  const { username, email, password, profile_picture, bio, location } = req.body;

  try {
    const existingUser = await User.findOne({email: email})
    if (existingUser) {
      return res.status(400).json({message: "Email already exists"})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
      profile_picture: profile_picture,
      bio: bio,
      location: location
    })

    await newUser.save();
    res.status(201).json({user: newUser})
  }
  catch(error) {
    res.status(500).json({message: "Server error", error: error.message})
  }
}

const getUserProfile = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { password, profile_picture, bio, location } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        password: password,
        profile_picture: profile_picture,
        bio: bio,
        location: location,
      },
      { new: true, runValidators: true } // return the updated user, (if new is not set to true, it will return the old user)
    ).select("-password"); // exlude the password field

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User was not found" });
    }

    res.status(200).json({ message: "User was sucessfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getAllUsers,
};
