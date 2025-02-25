const { body } = require("express-validator");

const validateUser = [
  body("username")
    .optional()
    .isString()
    .withMessage("Username must me a string"),
  body("email").optional().isEmail().withMessage("Email must be valid"),
  body("password")
    .optional()
    .isStrongPassword()
    .withMessage("Password must be a strong password"),
];

const validateExercise = [
  body("name").optional().isString().withMessage("Name must be a String"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a String"),
  body("group")
    .optional()
    .isIn([
      "Bicep",
      "Back",
      "Shoulder",
      "Chest",
      "Calve",
      "Hamstring",
      "Tricep",
      "Leg",
      "Abs",
      "Glute",
      "Cardio",
      "Other",
    ])
    .withMessage("Group has to be on of the eligible groups"),
  body("gifUrl").optional().isURL().withMessage("GifUrl has to be of type URL"),
];

const validateMessage = [
  body("userId").optional().isMongoId().withMessage("Invalid userId"),
  body("receiverId").optional().isMongoId().withMessage("Invalid receiverId"),
  body("content").optional().isString().withMessage("Content must be a string"),
];

const validateWorkout = [
  body("userId").optional().isMongoId().withMessage("Invalid userId"),
  body("exercises")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Exercises must be an array with at least one exercise"),

  body("exercises.*.exerciseId")
    .optional()
    .isMongoId()
    .withMessage("exerciseId must be a valid MongoDB ObjectId"),

  body("exercises.*.sets")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Sets must be a positive integer"),

  body("exercises.*.reps")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Reps must be a positive integer"),

  body("exercises.*.weight")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Weight must be a positive number"),

  body("notes").optional().isString().withMessage("Notes must be a string"),
];

const validateAchievment = [
  body("userId").optional().isMongoId().withMessage("Invalid userId"),
  body("challengeId").optional().isMongoId().withMessage("Invalid challengeId"),
];

const validateChallenge = [
  body("name").optional().isString().withMessage("Name must be a string"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("start_date")
    .optional()
    .isDate()
    .withMessage("Start date must be a date"),
  body("end_date").optional().isDate().withMessage("End date must be a date"),
  body("goal").optional().isString().withMessage("Goal must be a string"),
  body("reward").optional().isString().withMessage("Reward must be a string"),

  body("start_date").custom((value, { req }) => {
    if (value >= req.body.end_date) {
      throw new Error("Start date must be before end date");
    }
    return true;
  }),
];

const validateComment = [
  body("user_id").optional().isMongoId().withMessage("Invalid userId"),
  body("post_id").optional().isMongoId().withMessage("Invalid postId"),
  body("content").optional().isString().withMessage("Content must be a string"),
];

const validateFriendShip = [
  body("follower_id").optional().isMongoId().withMessage("Invalid followerId"),
  body("following_id")
    .optional()
    .isMongoId()
    .withMessage("Invalid followingId"),
  body("status")
    .optional()
    .isIn(["pending", "accepted", "rejected"])
    .withMessage(
      "Status must be one of the following: pending, accepted, rejected"
    ),
];

const validateLike = [
  body("user_id").optional().isMongoId().withMessage("Invalid userId"),
  body("post_id").optional().isMongoId().withMessage("Invalid postId"),
];

const validateNotification = [
  body("user_id").optional().isMongoId().withMessage("Invalid userId"),
  body("type")
    .optional()
    .isIn(["like", "comment", "friendship", "workout", "message"])
    .withMessage(
      "Type must be one of the following: like, comment, friendship, workout, message"
    ),
  body("content").optional().isString().withMessage("Content must be a string"),
  body("is_read")
    .optional()
    .isBoolean()
    .withMessage("is_read must be a boolean"),
];

const validatePost = [
  body("user_id").optional().isMongoId().withMessage("Invalid userId"),
  body("content").optional().isString().withMessage("Content must be a string"),
  body("image").optional().isURL().withMessage("Image must be a URL"),
  body("workout_id").optional().isMongoId().withMessage("Invalid workoutId"),
  body("localization")
    .optional()
    .isString()
    .withMessage("Localization must be a string"),
];

const validateSubscription = [
  body("user_id").optional().isMongoId().withMessage("Invalid userId"),
  body("plan")
    .optional()
    .isIn(["free", "premium"])
    .withMessage("Plan must be one of the following: free, premium"),
  body("start_date")
    .optional()
    .isDate()
    .withMessage("Start date must be a date"),
  body("end_date").optional().isDate().withMessage("End date must be a date"),
];

const validateUserChallenge = [
  body("user_id").optional().isMongoId().withMessage("Invalid userId"),
  body("challenge_id")
    .optional()
    .isMongoId()
    .withMessage("Invalid achievmentId"),
  body("progress")
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage("Progress must be an integer between 0 and 100"),
];

module.exports = {
  validateUser,
  validateExercise,
  validateMessage,
  validateWorkout,
  validateAchievment,
  validateChallenge,
  validateComment,
  validateFriendShip,
  validateLike,
  validateNotification,
  validatePost,
  validateSubscription,
  validateUserChallenge,
};
