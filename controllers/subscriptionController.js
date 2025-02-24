const Subscription = require("../models/subscriptionSchema");
const User = require("../models/userSchema");

const createSubscription = async (req, res) => {
  const { user_id, plan, start_date, end_date } = req.body;

  try {
    const existingUser = await User.findById(user_id);
    if (!existingUser) {
      res.status(404).json({ message: "User not found" });
    }

    const newSubscription = new Subscription({
      user_id,
      plan,
      start_date,
      end_date,
    });

    newSubscription.save();
    res.status(201).json(newSubscription);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateSubscription = async (req, res) => {
  const user_id = req.params.user_id;
  const { plan, start_date, end_date } = req.body;

  try {
    const existingUser = await User.findById(user_id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingSubscription = await Subscription.findOne({ user_id });
    if (!existingSubscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    existingSubscription.plan = plan;
    existingSubscription.start_date = start_date;
    existingSubscription.end_date = end_date;

    existingSubscription.save();

    res.status(200).json(existingSubscription);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getSubscription = async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const existingUser = await User.findById(user_id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const subscription = await Subscription.findOne({ user_id: user_id });
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    res.status(200).json(subscription);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteSubscription = async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const existingUser = await User.findById(user_id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    await Subscription.findOneAndDelete({ user_id: user_id });

    res.status(200).json({ message: "Subscription deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createSubscription,
  updateSubscription,
  getSubscription,
  deleteSubscription,
};
