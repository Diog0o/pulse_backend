const Message = require("../models/messageSchema");
const User = require("../models/userSchema");

const createMessage = async (req, res) => {
  const { userId, receiverId, content } = req.body;

  try {

    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const existingReceiver = await User.findById(receiverId);

    if (!existingReceiver) {
      return res.status(404).json({ message: "Receiver does not exist" });
    }


    const message = new Message({
      userId,
      receiverId,
      content,
    });

    await message.save();

    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const updateMessage = async (req, res) => {
  const messageId = req.params.messageId;
  const { content, isRead } = req.body;

  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { content: content, isRead: isRead },
      { new: true, runValidators: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ message: "Message does not exist" });
    }

    res.status(200).json({ updatedMessage });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const deleteMessage = async (req, res) => {
  const messageId = req.params.messageId;

  try {
    const deletedMessage = await Message.findByIdAndDelete(messageId);

    if (!deletedMessage) {
      return res.status(404).json({ message: "Message doesnt exist" });
    }

    res.status(200).json({ message: "Message was deleted sucessfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getMessage = async (req, res) => {
  const messageId = req.params.messageId;

  try {
    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ message: "Message doesnt exist" });
    }

    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getMessagesFromTwoUsers = async (req, res) => {
  const { userId, receiverId } = req.query;

  try {
    const messages = await Message.find({
      $or: [
        { userId: userId, receiverId: receiverId },
        { userId: receiverId, receiverId: userId },
      ],
    }).sort({ timestamp: 1 });

    if (messages.length === 0) {
      return res.status(404).json({ message: "No messages found" });
    }

    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();

    if (messages.length === 0) {
      return res.status(404).json({ message: "No messages found" });
    }

    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createMessage,
  updateMessage,
  deleteMessage,
  getMessage,
  getMessagesFromTwoUsers,
  getAllMessages,
};
