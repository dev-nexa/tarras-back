const locationsRepository = require('../repositories/locationsRepository');

module.exports = {
    createLocation: async (req, res) => {
        try {
            const locationData = req.body;
            const result = await locationsRepository.createLocation(locationData);
            res.status(201).json({ message: 'Location created successfully', location: result });
        } catch (error) {
            console.error('Error creating location:', error);
            res.status(500).json({ error: 'Failed to create location' });
        }
    },

    getAllLocations: async (req, res) => {
        try {
            const locations = await locationsRepository.getAllLocations();
            res.status(200).json({
                message: "تم جلب البيانات بنجاح",
                locations: locations
            });
        } catch (error) {
            console.error('Error fetching locations:', error);
            res.status(500).json({ error: 'Failed to fetch locations' });
        }
    },

    getLocationById: async (req, res) => {
        try {
            const { id } = req.params;
            const location = await locationsRepository.getLocationById(id);
            if (location) {
                res.status(200).json(location);
            } else {
                res.status(404).json({ error: 'لا يوجد موقع يحمل هذا المعرف' });
            }
        } catch (error) {
            console.error('Error fetching location by ID:', error);
            res.status(500).json({ error: 'Failed to fetch location' });
        }
    },

    updateLocationById: async (req, res) => {
        try {
            const { id } = req.params;
            const locationData = req.body;
            const result = await locationsRepository.updateLocationById(id, locationData);
            if (result.affectedRows) {
                res.status(200).json({ message: 'تم تعديل معلومات الموقع بنجاح.', location: locationData });
            } else {
                res.status(404).json({ error: 'لا يوجد موقع يحمل هذا المعرف', id: id });
            }
        } catch (error) {
            console.error('Error updating location:', error);
            res.status(500).json({ error: 'Failed to update location' });
        }
    },

    deleteLocationById: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await locationsRepository.deleteLocationById(id);
            if (result.affectedRows) {
                res.status(200).json({ message: 'تم حذف الموقع بنجاح' });
            } else {
                res.status(404).json({ error: 'لا  يوجد موقع يحمل هذا المعرف', id: id});
            }
        } catch (error) {
            console.error('Error deleting location:', error);
            res.status(500).json({ error: 'Failed to delete location' });
        }
    }
};
