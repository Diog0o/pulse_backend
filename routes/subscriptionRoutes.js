const express = require("express");
const router = express.Router();
const {
  createSubscription,
  updateSubscription,
  getSubscription,
  deleteSubscription,
} = require("../controllers/subscriptionController");

const { validateSubscription } = require("../middleware/validator");
const { validationResult } = require("express-validator");

//create a subscription
router.post(
  "/create",
  validateSubscription,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createSubscription
);

//update a subscription
router.put(
  "/:subscription_id",
  validateSubscription,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  updateSubscription
);

//get a subscription
router.get("/:user_id", getSubscription);

//delete a subscription
router.delete("/:subscription_id", deleteSubscription);

module.exports = router;
