const dailyTableEmployeesRepository = require('../repositories/dailyTableEmployeesRepository');
const typesRepository = require('../repositories/employeesTypesRepository');
const employeesRepository = require('../repositories/employeesRepository');
const tableRepository = require('../repositories/tableRepository');

const dailyTableEmployeesController = {
    assignTablesToEmployee: async (req, res) => {
        try {
            const { employee_id, table_ids } = req.body;
    
            const employee = await employeesRepository.getemployeeById(employee_id);
            if (!employee) {
                return res.status(404).json({
                    message: "لا يوجد موظف يحمل هذا المعرف",
                    id: employee_id
                });
            }
    
            const isCapten = await typesRepository.getTypeById(employee.type_id);
            if (isCapten.name !== 'كابتن') {
                return res.status(400).json({ message: 'الشخص المختار ليس كابتن' });
            }
    
            const tableIdsExist = await tableRepository.tableIdsExist(table_ids);
            if (!tableIdsExist) {
                return res.status(404).json({ message: 'يوجد على الاقل طاولة واحدة غير موجودة' });
            }
    
            const tableIdsAvailable = await dailyTableEmployeesRepository.tableIdsTaken(table_ids, employee_id);
            if (!tableIdsAvailable) {
                return res.status(400).json({ message: 'يوجد على الاقل طاولة واحدة غير متاحة' });
            }
    
            const employeeOldTable = await dailyTableEmployeesRepository.getAllTableByEmployeeId(employee_id);
    
            await tableRepository.updateTableTakenByEmloyeeId(employeeOldTable);
    
            await dailyTableEmployeesRepository.deletAllTableByMe(employee_id);
    
            await dailyTableEmployeesRepository.assignTablesToEmployee(employee_id, table_ids);
    
            await tableRepository.updateTableTaken(table_ids);
    
            return res.status(200).json({
                message: 'تم تحديث الارتياط بنجاح'
            });
    
        } catch (error) {
            console.error('Error assigning tables to employee:', error);
            res.status(500).json({ message: 'خطأ في الخادم أثناء تعيين الطاولات.' });
        }
    },


    // removeTablesFromEmployee: async (req, res) => {
    //     try {
    //         const { employee_id, table_ids } = req.body;
    //         const result = await dailyTableEmployeesRepository.removeTablesFromEmployee(employee_id, table_ids);
    //         res.status(200).json({ message: 'تم إزالة الطاولات من الموظف بنجاح', result });
    //     } catch (error) {
    //         console.error('Error removing tables from employee:', error);
    //         res.status(500).json({ message: 'خطأ في الخادم أثناء إزالة الطاولات.' });
    //     }
    // }
};


module.exports = dailyTableEmployeesController;