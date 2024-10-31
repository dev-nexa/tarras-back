const { body, validationResult, param } = require('express-validator');
const bcrypt = require('bcryptjs');

const validateCustomer = [
    body('full_name').isLength({ min: 3 }).withMessage('الاسم الكامل يجب أن يكون على الأقل 3 حروف'),
    body('phone_number').isMobilePhone('any').withMessage('رقم الهاتف غير صالح'),
    body('password').isLength({ min: 8 }).withMessage('كلمة المرور يجب أن تكون على الأقل 8 حروف'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateCustomerId = [
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

const validateCustomerPhone = [
    param('phone')
        .isMobilePhone('any')
        .withMessage('رقم الهاتف غير صالح'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateCustomerName = [
    param('name')
        .isLength({ min: 1, max: 50 })
        .withMessage('يجب ان يكون عدد احرف الاسم بين الحرف والخمسين حرف')
        .matches(/^[a-zA-Z\u0600-\u06FF\s]+$/)
        .withMessage('يجب ان يتكون الاسم من احرف ومسافات'),


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

const validateCustomerForUpdate = [
    body('full_name').isLength({ min: 3 }).withMessage('الاسم الكامل يجب أن يكون على الأقل 3 حروف'),
    body('phone_number').isMobilePhone('any').withMessage('رقم الهاتف غير صالح'),

    (req, res, next) => {
        if (req.body.password) {
            body('password')
                .isLength({ min: 6 }).withMessage('يجب أن تتكون كلمة المرور من 6 حروف أو أكثر')
                .run(req);
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateCustomer, hashPassword, validateCustomerId, validateCustomerPhone, validateCustomerName, validateCustomerForUpdate };
