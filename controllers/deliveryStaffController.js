const deliveryStaffRepository = require('../repositories/deliveryStaffRepository');

const deliveryStaffController = {

    getAllStaff: async (req, res) => {
        try {
            const staff = await deliveryStaffRepository.getAllStaff();
            res.status(200).json({
                message: 'تم استرجاع جميع موظفي التوصيل بنجاح',
                staff
            });
        } catch (error) {
            console.error("Error retrieving staff:", error);
            res.status(500).json({ message: "خطأ في الخادم", error });
        }
    },

    getStaffById: async (req, res) => {
        try {
            const { id } = req.params;
            const staff = await deliveryStaffRepository.getStaffById(id);

            if (staff) {
                res.status(200).json({
                    message: 'تم استرجاع بيانات الموظف التوصيل بنجاح',
                    staff
                });
            } else {
                res.status(404).json({ message: 'لم يتم العثور على موظف التوصيل' });
            }
        } catch (error) {
            console.error("Error retrieving staff:", error);
            res.status(500).json({ message: "خطأ في الخادم", error });
        }
    },

    createStaff: async (req, res) => {
        try {
            const { full_name, phone_number, password_hash } = req.body;

            if (!full_name || !phone_number || !password_hash) {
                return res.status(400).json({ message: 'جميع الحقول مطلوبة' });
            }

            const staffData = { full_name, phone_number, password_hash };

            const existingStaff = await deliveryStaffRepository.findStaffByPhoneNumber(staffData.phone_number);
            if (existingStaff) {
                return res.status(400).json({
                    message: 'رقم الهاتف موجود بالفعل بحساب اخر',
                    staff: { full_name: staffData.full_name, phone_number: staffData.phone_number }
                });
            }

            const newStaff = await deliveryStaffRepository.createStaff(staffData);

            if (newStaff) {
                res.status(201).json({ message: 'تم انشاء حساب موظف التوصيل', staff: newStaff });
            } else {
                res.status(500).json({ message: 'فشل في انشاء حساب موظف التوصيل' });
            }
        } catch (error) {
            console.error("Error creating staff member:", error);
            res.status(500).json({ message: "Server error", error });
        }
    },

    updateStaffById: async (req, res) => {
        const staffId = req.params.id;
        const staffData = req.body;

        try {
            const existingStaff = await deliveryStaffRepository.findStaffByPhoneNumber(staffData.phone_number, staffId);

            if (existingStaff && (existingStaff.id != staffId)) {
                return res.status(400).json({ message: 'رقم الهاتف موجود بالفعل بحساب اخر' });
            }

            const result = await deliveryStaffRepository.updateStaffById(staffId, staffData);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'موظف غير موجود' });
            }

            res.status(200).json({ message: 'تم تحديث معلومات الموظف بنجاح', staff: { id: staffId, ...staffData } });
        } catch (error) {
            console.error("Error updating staff member:", error);
            res.status(500).json({ message: "خطأ في الخادم", error });
        }
    },

    updateStaffPasswordById: async (req, res) => {
        const staffId = req.params.id;
        const hashedPassword = req.body.password_hash;

        try {
            const result = await deliveryStaffRepository.updateStaffPasswordById(staffId, hashedPassword);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'موظف غير موجود' });
            }

            res.status(200).json({ message: 'تم تحديث كلمة المرور بنجاح' });
        } catch (error) {
            console.error("Error updating staff password:", error);
            res.status(500).json({ message: "خطأ في الخادم", error });
        }
    },

    updateStaffStatusById: async (req, res) => {
        const staffId = req.params.id;
        const status = req.params.status;
        try {
            const result = await deliveryStaffRepository.updateStaffStatusById(staffId, status);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'موظف غير موجود' });
            }

            res.status(200).json({ message: 'تم تحديث حالة الموظف بنجاح', staffId, availability_state: status });
        } catch (error) {
            console.error("Error updating staff status:", error);
            res.status(500).json({ message: "خطأ في الخادم", error });
        }
    },

    deleteStaffById: async (req, res) => {
        const staffId = req.params.id;
        try {
            const result = await deliveryStaffRepository.deleteStaffById(staffId);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'موظف غير موجود' });
            }

            res.status(200).json({ message: 'تم حذف الموظف بنجاح' });
        } catch (error) {
            console.error("Error deleting staff member:", error);
            res.status(500).json({ message: "خطأ في الخادم", error });
        }
    },

    getAvailableStaff: async (req, res) => {
        try {
            const availableStaff = await deliveryStaffRepository.getAvailableStaff();

            if (availableStaff.length > 0) {
                res.status(200).json({
                    message: 'تم استرجاع موظفين التوصيل المتاحين بنجاح',
                    availableStaff
                });
            }
            else {
                res.status(200).json({
                    message: 'لا يوجد موظفين توصيل متاحين',
                    availableStaff
                });
            }
        } catch (error) {
            console.error("Error retrieving available staff:", error);
            res.status(500).json({ message: "خطأ في الخادم", error });
        }
    },
};

module.exports = deliveryStaffController;
