const express = require("express");
const router = express.Router();
const {
  createSubscription,
  updateSubscription,
  getSubscription,
  deleteSubscription
} = require("../controllers/subscriptionController");

//create a subscription
router.post("/create", createSubscription);

//update a subscription
router.put("/:subscription_id", updateSubscription);

//get a subscription
router.get("/:user_id", getSubscription);

//delete a subscription
router.delete("/:subscription_id", deleteSubscription);

module.exports = router;

