const Message = require('../models/messageSchema')

const createMessage = async (req, res) => {
    const { userId, receiverId, content } = req.body;

    try {
        const message = new Message({
            userId,
            receiverId,
            content
        });

        await message.save()

        res.status(200).json({message})
    }
    catch (error) {
        res.status(500).json({message: 'Server Error', error: error.message});
    }
}

const updateMessage = async (req, res) => {
    const messageId = req.params.messageId;
    const content = req.body;

    try {
        const updatedMessage = await Message.findByIdAndUpdate(messageId,
            {content: content},
            {new: true}
        );

        if (!updatedMessage) {
            return res.status(404).json({message: 'Message does not exist'});
        }

        res.status(200).json({updatedMessage})

    } 
    catch (error) {
        res.status(500).json({message: 'Server Error', error: error.message})
    }
}

const deleteMessage = async (req, res) => {
    const messageId = req.params.messageId;

    try{
        const deletedMessage = await Message.findByIdAndDelete(messageId);

        if (!deletedMessage) {
            return res.status(404).json({message: 'Message doesnt exist'});
        }

        res.status(200).json({message: 'Message was deletede sucessfully'});
    }
    catch (error) {
        res.status(500).json({message: 'Server Error', error: error.message});
    }
}

const getMessage = async (req, res) => {
    const messageId = req.params.messageId;

    try {
        const message = await Message.findById(messageId);

        if (!message) {
            return res.status(404).json({message: 'Message doesnt exist'});
        }

        res.status(200).json({message});
    }
    catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
}

const getMessagesFromTwoUsers = async (req, res) => {
    const { userId, receiverId } = req.body;

    try {
        const messages = await Message.find({
            $or: [
                {userId: userId, receiverId: receiverId},
                {userId: receiverId, receiverId: userId}
            ]
        });

        if (!messages) {
            res.status(404).json({message: 'No messages found'});
        }
        
        //order messages by timestamp
        messages.sort((a, b) => a.timestamp - b.timestamp);

        res.status(200).json({messages});


    }
    catch (error) {
        res.status(500).json({message: 'Server error', error: error.message})
    }
}

module.exports = {
    createMessage,
    updateMessage,
    deleteMessage,
    getMessage,
    getMessagesFromTwoUsers
}


