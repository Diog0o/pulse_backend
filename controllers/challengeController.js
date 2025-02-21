const Challenge = require('../models/challengeSchema');

const createChallenge = async (req, res) => {
    const { name, description, start_date, end_date, goal, reward } = req.body;
    
    try {
        const existingChallenge = await Challenge.findOne({ name });
        if (existingChallenge) {
            return res.status(400).json({ message: "Challenge already exists" });
        }

        const newChallenge = new Challenge({
            name: name,
            description: description,
            start_date: start_date,
            end_date: end_date,
            goal: goal,
            reward: reward
        });

        await newChallenge.save();
        res.status(201).json(newChallenge);

    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

const getChallenges = async (req, res) => {
    try {
        const Challenges = await Challenge.find();
        res.status(200).json(Challenges);
    
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteChallenge = async (req, res) => {
    const Challenge_id = req.params.Challenge_id;

    try {
        const existingChallenge = await Challenge.findById(Challenge_id);

        if (!existingChallenge) {
            return res.status(404).json({ message: "Challenge not found" });
        }

        await Challenge.findByIdAndDelete(Challenge_id);
        res.status(200).json({ message: "Challenge deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

const updateChallenge = async (req, res) => {
    const { challenge_id } = req.params;
    const { name, description, start_date, end_date, goal, reward } = req.body;

    try {
        // Validate dates
        if (start_date && end_date && new Date(start_date) >= new Date(end_date)) {
            return res.status(400).json({ message: "Start date must be before end date" });
        }

        // Update the challenge directly
        const updatedChallenge = await Challenge.findByIdAndUpdate(
            challenge_id,
            { name, description, start_date, end_date, goal, reward },
            { new: true, runValidators: true }
        );

        if (!updatedChallenge) {
            return res.status(404).json({ message: "Challenge not found" });
        }

        res.status(200).json(updatedChallenge);
    } 
    catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};
