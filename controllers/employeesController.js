const employeesRepository = require('../repositories/employeesRepository');

const employeesController = {

    getAllemployees: async (req, res) => {
        try {
            const employees = await employeesRepository.getAllemployees();
            res.json(employees);
        } catch (error) {
            res.status(500).json({ message: "خطأ في الخادم", error });
        }
    },

    getemployeeById: async (req, res) => {
        try {
            const { id } = req.params;
            const employee = await employeesRepository.getemployeeById(id);

            if (employee) {
                res.json({
                    message: "تم العثور على الموظف بنجاح",
                    data: employee
                });
            } else {
                res.status(404).json({ message: "لم يتم العثور على الموظف" });
            }
        } catch (error) {
            console.error("Server error:", error);
            res.status(500).json({ message: "خطأ في الخادم", error });
        }
    },

    createemployee: async (req, res) => {
        try {
            const employeeData = req.body;
            const numberExist = await employeesRepository.checkPhoneNumberExists(employeeData.phone_number);
            if (numberExist) {
                return res.status(400).json({
                    message: "الرقم موجود مسبقا",
                });
            }

            const newEmployee = await employeesRepository.createemployee(employeeData);

            res.status(201).json({
                message: "تم انشاء الموظف بنجاح",
                employee: newEmployee,
            });
        } catch (error) {
            console.error("Error creating employee:", error);
            res.status(500).json({ message: "Server error", error });
        }
    },

    

    updateemployeeById: async (req, res) => {
        try {
            const { id } = req.params;
            const employeeData = req.body;

            const phoneExists = await employeesRepository.checkPhoneNumberAndIdExists(employeeData.phone_number, id);
            if (phoneExists) {
                return res.status(400).json({
                    message: "رقم الهاتف موجود بالفعل",
                });
            }

            const employee = await employeesRepository.getemployeeById(id);
            if(!employee) {
                return res.status(404).json({
                    message: "لا يوجد مستخدم يحمل هذا المعرف",
                });
            }

            const updatedEmployee = await employeesRepository.updateemployeeById(id, employeeData);

            if (updatedEmployee) {
                res.json({
                    message: 'تم تحديث بيانات الموظف',
                    employee: updatedEmployee,
                });
            } else {
                res.status(404).json({ message: 'لا يوجد موظف يحمل هذا المعرف' });
            }
        } catch (error) {
            console.error("Error updating employee:", error);
            res.status(500).json({ message: "Server error", error });
        }
    },

    updateemployeePasswordById: async (req, res) => {
        const employeeId = req.params.id;
        const hashedPassword = req.body.password_hash;

        try {
            const employee = await employeesRepository.getemployeeById(employeeId);
            if(!employee) {
                return res.status(404).json({
                    message: "لا يوجد مستخدم يحمل هذا المعرف",
                });
            }

            const result = await employeesRepository.updateemployeePasswordById(employeeId, hashedPassword);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'موظف غير موجود' });
            }

            res.status(200).json({ message: 'تم تحديث كلمة المرور بنجاح' });
        } catch (error) {
            console.error("Error updating employee password:", error);
            res.status(500).json({ message: "خطأ في الخادم", error });
        }
    },

    deleteemployeeById: async (req, res) => {
        try {
            const { id } = req.params;
            
            const result = await employeesRepository.deleteemployeeById(id);
    
            if (result) {
                res.json(result);
            } else {
                res.status(404).json({ message: "لا يوجد موظف يحمل هذا المعرف" });
            }
        } catch (error) {
            console.error("Error deleting employee:", error);
            res.status(500).json({ message: "Server error", error });
        }
    },
};

module.exports = employeesController;
