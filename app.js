const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const messageRoutes = require('./routes/messageRoutes');
const friendshipRoutes = require('./routes/friendshipRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const likeRoutes = require('./routes/likeRoutes');
const challengeRoutes = require('./routes/challengeRoutes');
const userChallengeRoutes = require('./routes/userChallengeRoutes');
const achievmentRoutes = require('./routes/achievmentRoutes');
const notificationRoutes = require('./routes/notificationsRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const authRoutes = require('./routes/authRoutes');
const workoutDoneRoutes = require('./routes/workoutDoneRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/friendships', friendshipRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/user-challenges', userChallengeRoutes);
app.use('/api/achievments', achievmentRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/workouts-done', workoutDoneRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;