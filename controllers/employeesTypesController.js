const typesRepository = require('../repositories/employeesTypesRepository.js');

const typesController = {
    createType: async (req, res) => {
        try {
            const { name } = req.body;
            const result = await typesRepository.createType(name);
            if(!result) {
                res.status(400).json({ message: 'حدث خطا ما' });
            }
            res.status(201).json({ message: 'تم إنشاء النوع بنجاح', name });
        } catch (error) {
            console.error('Error creating type:', error);
            res.status(500).json({ message: 'خطأ في الخادم أثناء إنشاء النوع.' });
        }
    },

    getAllTypes: async (req, res) => {
        try {
            const types = await typesRepository.getAllTypes();
            res.status(200).json(types);
        } catch (error) {
            console.error('Error fetching types:', error);
            res.status(500).json({ message: 'خطأ في الخادم أثناء جلب الأنواع.' });
        }
    },

    getTypeById: async (req, res) => {
        try {
            const { id } = req.params;
            const type = await typesRepository.getTypeById(id);
            if (!type) {
                return res.status(404).json({ message: 'هذا النوع غير موجود' });
            }
            res.status(200).json(type);
        } catch (error) {
            console.error('Error fetching type:', error);
            res.status(500).json({ message: 'خطأ في الخادم أثناء جلب النوع.' });
        }
    },

    updateTypeById: async (req, res) => {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const result = await typesRepository.updateTypeById(id, name);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'هذا النوع غير موجود' });
            }
            res.status(200).json({ message: 'تم تحديث النوع بنجاح' });
        } catch (error) {
            console.error('Error updating type:', error);
            res.status(500).json({ message: 'خطأ في الخادم أثناء تحديث النوع.' });
        }
    },

    deleteTypeById: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await typesRepository.deleteTypeById(id);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'هذا النوع غير موجود' });
            }
            res.status(200).json({ message: 'تم حذف النوع بنجاح' });
        } catch (error) {
            console.error('Error deleting type:', error);
            res.status(500).json({ message: 'خطأ في الخادم أثناء حذف النوع.' });
        }
    }
};

module.exports = typesController;
