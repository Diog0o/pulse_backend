const { body } = require('express-validator')

const validateUser = [
    body("username").isString().withMessage("Username bust me a string"),
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").optional().isStrongPassword().withMessage("PAssword musst be a strong password")
];

const validateExercise = [
    body("name").optional().isString().withMessage("Name must be a String"),
    body("description").optional().isString().withMessage("Description must be a String"),
    body("group")
        .optional()
        .isIn(['Bicep',
        'Back',
        'Shoulder',
        'Chest',
        'Calve',
        'Hamstring',
        'Tricep',
        'Leg',
        'Abs',
        'Glute',
        'Cardio',
        'Other'])
        .withMessage("Group has to be on of the eligible groups"),
    body("gifUrl").optional().isURL().withMessage("GifUrl has to be of type URL")
];

const validateMessage = [
    body("userId").optional().isMongoId().withMessage("Invalid userId"),
    body("receiverId").optional().isMongoId().withMessage("Invalid receiverId"),
    body("content").isString().withMessage("Content must be a string")
];

const validateWorkout = [
    body("userId").isMongoId().withMessage("Invalid userId"),
    body("exercises").isArray({ min: 1 }).withMessage("Exercises must be an array with at least one exercise"),

    body("exercises.*.exerciseId")
        .isMongoId()
        .withMessage("exerciseId must be a valid MongoDB ObjectId"),

    body("exercises.*.sets")
        .isInt({ min: 1 })
        .withMessage("Sets must be a positive integer"),

    body("exercises.*.reps")
        .isInt({ min: 1 })
        .withMessage("Reps must be a positive integer"),

    body("exercises.*.weight")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Weight must be a positive number"),

    body("notes").isString().withMessage("Notes must be a string")
];

module.exports = {
    validateUser,
    validateExercise,
    validateMessage,
    validateWorkout
}

