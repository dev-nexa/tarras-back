const db = require('../config/db');

module.exports = {
    createLocation: async (locationData) => {
        try {
            const query = 'INSERT INTO locations (region, price) VALUES (?, ?)';
            const [result] = await db.execute(query, [locationData.region, locationData.price]);
            return { id: result.insertId, ...locationData };
        } catch (error) {
            console.error('Database error:', error);
            throw error;
        }
    },

    getAllLocations: async () => {
        try {
            const query = 'SELECT * FROM locations';
            const [locations] = await db.execute(query);
            return locations;
        } catch (error) {
            console.error('Database error:', error);
            throw error;
        }
    },

    getLocationById: async (id) => {
        try {
            const query = 'SELECT * FROM locations WHERE id = ?';
            const [locations] = await db.execute(query, [id]);
            return locations.length ? locations[0] : null;
        } catch (error) {
            console.error('Database error:', error);
            throw error;
        }
    },

    updateLocationById: async (id, locationData) => {
        try {
            const query = 'UPDATE locations SET region = ?, price = ? WHERE id = ?';
            const [result] = await db.execute(query, [locationData.region, locationData.price, id]);
            return result;
        } catch (error) {
            console.error('Database error:', error);
            throw error;
        }
    },

    deleteLocationById: async (id) => {
        try {
            const query = 'DELETE FROM locations WHERE id = ?';
            const [result] = await db.execute(query, [id]);
            return result;
        } catch (error) {
            console.error('Database error:', error);
            throw error;
        }
    },

    getDeliveryPriceByLocationId: async (locationId) => {
        const query = 'SELECT price FROM locations WHERE id = ?';
        const [rows] = await db.execute(query, [locationId]);
        return rows.length ? rows[0].price : null;
    },
};
