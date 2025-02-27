const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User
            .findOne({ email })
            .select("+password");

        if (!existingUser) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const accessToken = jwt.sign({ userId: existingUser._id }, process.env.SECRET_ACCESS_TOKEN, { expiresIn: "1h" });
        const refreshToken = jwt.sign({ userId: existingUser._id }, process.env.SECRET_REFRESH_TOKEN, { expiresIn: "1d" });

        existingUser.refreshToken = refreshToken;
        await existingUser.save();

        res.status(200).json({ user: existingUser, accessToken, refreshToken });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const logoutUser = async (req, res) => {
    const { refreshToken } = req.body;

    try {
        const existingUser = await User
            .findOne({ refreshToken });

        if (!existingUser) {
            return res.status(400).json({ message: "Invalid token" });
        }

        existingUser.refreshToken = "";
        await existingUser.save();

        res.status(200).json({ message: "User has been logged out" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    try {
        const existingUser = await User.findOne({ refreshToken });

        if (!existingUser) {
            return res.status(400).json({ message: "Invalid token" });
        }

        const accessToken = jwt.sign({ userId: existingUser._id }, process.env.SECRET_ACCESS_TOKEN, { expiresIn: "1h" });
        const newRefreshToken = jwt.sign({ userId: existingUser._id }, process.env.SECRET_REFRESH_TOKEN, { expiresIn: "1d" });

        existingUser.refreshToken = newRefreshToken;
        await existingUser.save();

        res.status(200).json({ accessToken, newRefreshToken });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = { loginUser, logoutUser, refreshToken };