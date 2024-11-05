const messagesRepository = require('../repositories/messagesRepository.js');

const messagesController = {
    createMessage: async (req, res) => {
        try {
            const messageData = req.body;
            const newMessage = await messagesRepository.createMessage(messageData);

            if(!newMessage.id)
                res.status(400).json({ error: 'لم يتم ارسال الرسالة' });

            res.status(201).json({ message: 'تم إنشاء الرسالة بنجاح', data: newMessage });
        } catch (error) {
            console.error('Error creating message:', error);
            res.status(500).json({ error: 'فشل في إنشاء الرسالة' });
        }
    },

    getAllMessages: async (req, res) => {
        try {
            const messages = await messagesRepository.getAllMessages();
            res.status(200).json({ message: 'تم استرجاع جميع الرسائل بنجاح', data: messages });
        } catch (error) {
            console.error('Error fetching messages:', error);
            res.status(500).json({ error: 'فشل في استرجاع الرسائل' });
        }
    },

    getMessageById: async (req, res) => {
        try {
            const { id } = req.params;
            const message = await messagesRepository.getMessageById(id);
            if (message) {
                res.status(200).json({ message: 'تم استرجاع الرسالة بنجاح', data: message });
            } else {
                res.status(404).json({ error: 'الرسالة غير موجودة' });
            }
        } catch (error) {
            console.error('Error fetching message by ID:', error);
            res.status(500).json({ error: 'فشل في استرجاع الرسالة' });
        }
    },

    // updateMessageById: async (req, res) => {
    //     try {
    //         const { id } = req.params;
    //         const messageData = req.body;
    //         const updatedMessage = await messagesRepository.updateMessageById(id, messageData);
    //         if (updatedMessage) {
    //             res.status(200).json({ message: 'تم تحديث الرسالة بنجاح', data: updatedMessage });
    //         } else {
    //             res.status(404).json({ error: 'الرسالة غير موجودة' });
    //         }
    //     } catch (error) {
    //         console.error('Error updating message:', error);
    //         res.status(500).json({ error: 'فشل في تحديث الرسالة' });
    //     }
    // },

    deleteMessageById: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await messagesRepository.deleteMessageById(id);
            if (result.affectedRows) {
                res.status(200).json({ message: 'تم حذف الرسالة بنجاح' });
            } else {
                res.status(404).json({ error: 'الرسالة غير موجودة' });
            }
        } catch (error) {
            console.error('Error deleting message:', error);
            res.status(500).json({ error: 'فشل في حذف الرسالة' });
        }
    }
};

module.exports = messagesController;