const { body, validationResult, param } = require('express-validator');
const bcrypt = require('bcryptjs');

const validateDeliveryStaff = [
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

const validateDeliveryStaffPassword = [
    body('password').isLength({ min: 8 }).withMessage('كلمة المرور يجب أن تكون على الأقل 8 حروف'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateDeliveryStaffForUpdate = [
    body('full_name').isLength({ min: 3 }).withMessage('الاسم الكامل يجب أن يكون على الأقل 3 حروف'),
    body('phone_number').isMobilePhone('any').withMessage('رقم الهاتف غير صالح'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateDeliveryStaffForStatusUpdate = [
    param('status')
        .isIn([0, 1])
        .withMessage('الحالة يجب ان تكون اما صفر او واحد'),

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

const validateDeliveryStaffId = [
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

// Middleware for Authentication (e.g., login process)
const authenticateStaff = async (req, res, next) => {
    try {
        const { phone_number, password } = req.body;
        
        // Assuming a function `findStaffByPhoneNumber` fetches staff data from the repository
        const staff = await staffRepository.findStaffByPhoneNumber(phone_number);
        
        if (!staff) {
            return res.status(404).json({ message: 'Staff not found.' });
        }
        
        const isPasswordValid = await bcrypt.compare(password, staff.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        
        req.staff = staff; // Add staff info to the request object
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { validateDeliveryStaff, hashPassword, validateDeliveryStaffId, validateDeliveryStaffForUpdate, validateDeliveryStaffPassword, validateDeliveryStaffForStatusUpdate };

