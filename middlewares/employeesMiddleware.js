const { body, validationResult, param } = require('express-validator');
const bcrypt = require('bcryptjs');

const validateEmployee = [
    body('full_name').isLength({ min: 3 }).withMessage('الاسم الكامل يجب أن يكون على الأقل 3 حروف'),
    body('type_id').isInt({ gt: 0 }).withMessage('معرف نوع الموظف يجب ان يكون اكبر من صفر'),
    body('phone_number').isMobilePhone('any').withMessage('رقم الهاتف غير صالح'),
    body('password').isLength({ min: 8 }).withMessage('كلمة المرور يجب أن تكون على الأقل 8 حروف'),
    body('salary').isNumeric().withMessage('الراتب يجب أن يكون رقماً'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateEmoloyeeId = [
    param('id')
        .isInt({ gt: 0 })
        .withMessage('المعرف يجب ان يكون رقم صحيح اكبر من الصفر'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const hashPassword = async (req, res, next) => {
    try {
        if (req.body.password) {
            req.body.password_hash = await bcrypt.hash(req.body.password, 10);
        }
        next();
    } catch (error) {
        return res.status(500).json({
            error: "فشل في تشفير الباسوورد",
            details: error.message,
        });
    }
};

const validateEmoloyeeForUpdate = [
    body('full_name').isLength({ min: 3 }).withMessage('الاسم الكامل يجب أن يكون على الأقل 3 حروف'),
    body('phone_number').isMobilePhone('any').withMessage('رقم الهاتف غير صالح'),
    body('type_id').isInt({ gt: 0 }).withMessage('معرف نوع الموظف يجب ان يكون اكبر من صفر'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateEmoloyeePasswordForUpdate = [
    body('password').isLength({ min: 8 }).withMessage('كلمة المرور يجب أن تكون على الأقل 8 حروف'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateEmoloyeeType = [
    param('type_id').isInt({ gt: 0 }).withMessage('معرف نوع الموظف يجب ان يكون اكبر من صفر'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { 
    hashPassword, 
    validateEmployee, 
    validateEmoloyeeId, 
    validateEmoloyeeType,
    validateEmoloyeeForUpdate,
    validateEmoloyeePasswordForUpdate 
};
