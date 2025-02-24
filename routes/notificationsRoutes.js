const express = require("express");
const router = express.Router();
const {
  createNotification,
  getNotifications,
  deleteNotification,
  updateNotification
} = require("../controllers/notificationsController");

//Create a notification
router.post("/create", createNotification);

//Get all notifications of a user
router.get("/:user_id", getNotifications);

//Delete a notification
router.delete("/:notification_id", deleteNotification);

//Update a notification
router.put("/:notification_id", updateNotification);

module.exports = router;
