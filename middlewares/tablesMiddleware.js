const { body, validationResult, param } = require('express-validator');

const validateTable = [

    body('qr_code')
        .optional()
        .isString().withMessage('qr يجب أن يكون نصًا.')
        // .isLength({ max: 200 }).withMessage('qr لا يمكن أن يتجاوز 200 حرف.')
        .trim().escape()
        .notEmpty().withMessage('qr مطلوب.'),

    body('details')
        .isString().withMessage('التفاصيل يجب ان تكون نصا'),

    body('number_of_people')
        .isNumeric().withMessage('عدد الاشخاص يجب أن يكون رقمًا.')
        .isInt({ min: 2 }).withMessage('عدد الاشخاص يجب أن يكون أكبر من أو يساوي 2.')
        .notEmpty().withMessage('عدد الاشخاص مطلوب.'),

    body('table_number')
        .isNumeric().withMessage('رقم الطاولة يجب أن يكون رقمًا.')
        .isInt({ min: 1 }).withMessage('رقم الطاولة يجب أن يكون أكبر من أو يساوي 1.')
        .notEmpty().withMessage('رقم الطاولة مطلوب.'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateTableState = [
    param('state')
        .isIn([0, 1, 2]).withMessage('رقم الحالة يجب أن يكون إما 0، 1 أو 2.')
        .notEmpty().withMessage('رقم الحالة مطلوب.'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateTableId = [
    param('id')
        .isInt({ gt: 0 }).withMessage('معرف الطاولة يجب أن يكون عدد صحيح موجب.')
        .notEmpty().withMessage('رقم الطاولة مطلوب.'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateTableQrCode = [
    param('qrcode')
        .optional()
        .isString().withMessage('qr يجب أن يكون نصًا.')
        .isLength({ max: 200 }).withMessage('qr لا يمكن أن يتجاوز 200 حرف.')
        .trim().escape()
        .notEmpty().withMessage('qr مطلوب.'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateTable, validateTableState, validateTableId, validateTableQrCode };
