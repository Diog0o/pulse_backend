const express = require("express");
const router = express.Router();
const {
  createNotification,
  getNotifications,
  deleteNotification,
  updateNotification,
} = require("../controllers/notificationsController");

const { validateNotification } = require("../middleware/validator");
const { validationResult } = require("express-validator");

//Create a notification
router.post(
  "/",
  validateNotification,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createNotification
);

//Get all notifications of a user
router.get("/:user_id", getNotifications);

//Delete a notification
router.delete("/:notification_id", deleteNotification);

//Update a notification
router.put(
  "/:notification_id",
  validateNotification,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  updateNotification
);

module.exports = router;
