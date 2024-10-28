const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const validateCustomer = [
    body('full_name').isLength({ min: 3 }).withMessage('الاسم الكامل يجب أن يكون على الأقل 3 حروف'),
    body('phone_number').isMobilePhone().withMessage('رقم الهاتف غير صالح'),
    body('password').isLength({ min: 8 }).withMessage('كلمة المرور يجب أن تكون على الأقل 8 حروف'),

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
        req.body.password_hash = await bcrypt.hash(req.body.password, 10);
        next();
    } catch (error) {
        return res.status(500).json({
            error: "فشل في تشفير الباسوورد",
            details: error.message,
        });
    }
};

module.exports = { validateCustomer, hashPassword };
