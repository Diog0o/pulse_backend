const Notification = require("../models/notificationSchema");
const User = require("../models/userSchema");

const createNotification = async (req, res) => {
  const { user_id, type, content } = req.body;

  try {
    const existingUser = await User.findById(user_id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const newNotification = new Notification({
      user_id: user_id,
      type: type,
      content: content,
    });

    await newNotification.save();

    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getNotifications = async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const existingUser = await User.findById(user_id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const notifications = await Notification.find({ user_id: user_id });

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const deleteNotification = async (req, res) => {
  const notification_id = req.params.notification_id;

  try {
    const existingNotification = await Notification.findById(notification_id);

    if (!existingNotification) {
      res.status(404).json({ message: "Notification not found" });
    }

    await Notification.findByIdAndDelete(notification_id);
    res.status(200).json({ message: "Notification deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const updateNotification = async (req, res) => {
  const notification_id = req.params.notification_id;
  const { content, is_read } = req.body;

  try {
    const updatedNotification = await Notification.findByIdAndUpdate(
      notification_id,
      {content: content, is_read: is_read},
      { new: true, runValidators: true }
    );

    if (!updatedNotification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json(updatedNotification);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  createNotification,
  getNotifications,
  deleteNotification,
  updateNotification,
};
