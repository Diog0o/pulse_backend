const Achievment = require('../models/achievmentSchema');
const User = require('../models/userSchema');
const Challange = require('../models/challangeSchema');

const createAchievment = async (req, res) => {
    const { user_id, challenge_id } = req.body;

    try {
        const existingAchievment = await Achievment.findOne({
            user_id: user_id,
            challenge_id: challenge_id
        })

        if (existingAchievment) {
            res.status(400).json({message: "Achievment already exists"});
        }

        const newAchievment = new Achievment({
            user_id: user_id,
            challenge_id: challenge_id
        })

        await newAchievment.save();

        res.status(201).json(newAchievment);
    }
    catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
}

const getAchievmentsByUser = async (req, res) => {
    const user_id = req.params.user_id;

    try {
        const existingUser = await User.findById(user_id);
        if (!existingUser) {
            res.status(404).json({message: "User not found"});
        }

        const achievments = await Achievment.find({user_id: user_id});

        res.status(200).json(achievments);
    }
    catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
}

const deleteAchievment = async (req, res) => {
    const achievment_id = req.params.achievment_id;

    try {
        const existingAchievment = await Achievment.findById(achievment_id);
        if (!existingAchievment) {
            res.status(404).json({message: "Achievment not found"});
        }

        await existingAchievment.remove();

        res.status(200).json({message: "Achievment deleted"});
    }
    catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
}

module.exports = {
    createAchievment,
    getAchievmentsByUser,
    deleteAchievment
}