const db = require('../config/db');

module.exports = {
    createMessage: async (messageData) => {
        try {
            const query = `INSERT INTO messages (full_name, email, content_subject, content) VALUES (?, ?, ?, ?)`;
            const [result] = await db.execute(query, [
                messageData.full_name,
                messageData.email,
                messageData.content_subject,
                messageData.content
            ]);
            return { id: result.insertId, ...messageData };
        } catch (error) {
            console.error('Database error:', error);
            throw error;
        }
    },

    getAllMessages: async () => {
        try {
            const query = `SELECT * FROM messages`;
            const [rows] = await db.execute(query);
            return rows;
        } catch (error) {
            console.error('Database error:', error);
            throw error;
        }
    },

    getMessageById: async (id) => {
        try {
            const query = `SELECT * FROM messages WHERE id = ?`;
            const [rows] = await db.execute(query, [id]);
            return rows[0];
        } catch (error) {
            console.error('Database error:', error);
            throw error;
        }
    },

    // updateMessageById: async (id, messageData) => {
    //     try {
    //         const updateQuery = `UPDATE messages SET full_name = ?, email = ?, content_subject = ?, content = ? WHERE id = ?`;
    //         await db.execute(updateQuery, [
    //             messageData.full_name,
    //             messageData.email,
    //             messageData.content_subject,
    //             messageData.content,
    //             id
    //         ]);
    //         const selectQuery = `SELECT * FROM messages WHERE id = ?`;
    //         const [rows] = await db.execute(selectQuery, [id]);
    //         return rows[0];
    //     } catch (error) {
    //         console.error('Database error:', error);
    //         throw error;
    //     }
    // },

    deleteMessageById: async (id) => {
        try {
            const query = `DELETE FROM messages WHERE id = ?`;
            const [result] = await db.execute(query, [id]);
            return result;
        } catch (error) {
            console.error('Database error:', error);
            throw error;
        }
    }
};
