const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { token } = require('morgan');

const registerUser = async (req,res) => {
    const { username, email, password } = req.body;

    try{
        //Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser){
            return res.status(400).json({message: 'The user already exists'})
        }

        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create a new user
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword
        });

        //Save the new user
        await newUser.save();

        //generate a JWT token for the user
        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.status(201).json({user: newUser, token})
    }
    catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
}

const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body
        //Check if the user already exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({message: 'User does not exist'})
        }

        //Compare the passwords

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword){
            return res.status(400).json({message: 'The passwords dont match'})
        }

        //Generate a JWT token
        const jwt_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({user, jwt_token})

    }
    catch (error){
        res.status(500).json({message: "Server error", error: error.message});
    }
}

const getUserProfile = async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const user = await User.findById(userId).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

const updateUserProfile = async (req,res) => {
    try{
        const userId = req.params.userId;
        const {username, email} = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId,
            {
                username: username, 
                email: email,
                updatedAt: Date.now
            },
            {new : true}
        ).select('-password'); // exlude the password field

        if (!updatedUser){
            return res.status(404).json({message: 'User not found'})
        }

    res.status(200).json({updatedUser})
    }
    catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser){
            return res.status(404).json({message: "User was not found"});
        }

        res.status(200).json({message: 'User was sucessfully deleted'})
    }
    catch (error){
        res.status(500).json({message: 'Server error', error: error.message})
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({users})        
    }
    catch(error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    deleteUser,
    getAllUsers
}