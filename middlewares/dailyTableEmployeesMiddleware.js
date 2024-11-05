const { body, validationResult } = require('express-validator');

const validateAssignTables = [
    body('employee_id')
        .isInt().withMessage('معرف الموظف يجب أن يكون رقمًا صحيحًا.')
        .notEmpty().withMessage('معرف الموظف مطلوب.'),
    body('table_ids')
        .isArray().withMessage('طاولات يجب أن تكون مصفوفة.')
        .notEmpty().withMessage('يجب تقديم قائمة الطاولات.')
        .custom((value) => {
            if (value.length === 0) {
                throw new Error('يجب تقديم على الأقل طاولة واحدة.');
            }
            return true;
        }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateAssignTables,
};
