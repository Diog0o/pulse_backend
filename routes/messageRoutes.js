const express = require ('express')
const router = express.Router();

const {
    createMessage,
    updateMessage,
    deleteMessage,
    getMessage,
    getMessagesFromTwoUsers,
    getAllMessages
} = require('../controllers/messageController');

const { validateMessage } = require('../middleware/validator');
const { validationResult } = require('express-validator');

//Create a new message
router.post('/create', validateMessage, (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    next();
},createMessage )

//Update a message
router.put('/:messageId', validateMessage, (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, updateMessage);

//Delete a message
router.delete('/:messageId', deleteMessage);

//Get all messages
router.get('/all', getAllMessages);

//Get all messages between two users
router.get('/conversation', getMessagesFromTwoUsers);

//Get one specific message
router.get('/:messageId', getMessage);

module.exports = router;