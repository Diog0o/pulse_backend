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

//Create a new message
router.post('/create', createMessage);

//Update a message
router.put('/:messageId', updateMessage);

//Delete a message
router.delete('/:messageId', deleteMessage);

//Get one specific message
router.get('/:messageId', getMessage);

//Get all messages between two users
router.get('/', getMessagesFromTwoUsers);

//Get all messages
router.get('/all', getAllMessages);

module.exports = router;