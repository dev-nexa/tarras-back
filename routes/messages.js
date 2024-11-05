const express = require('express');
const router = express.Router();

const messagesController = require('../controllers/messagesController');
const {
    validateMessage,
    validateMessageId,
} = require('../middlewares/messagesMiddleware.js');

router.post('/message', validateMessage, messagesController.createMessage);

router.get('/messages', messagesController.getAllMessages);

router.get('/message/:id', validateMessageId, messagesController.getMessageById);

router.delete('/message/:id', validateMessageId, messagesController.deleteMessageById);

module.exports = router;
