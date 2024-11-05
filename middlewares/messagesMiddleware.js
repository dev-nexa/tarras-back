const { body, param, validationResult } = require('express-validator');

const validateMessage = [
    body('full_name')
        .isString().withMessage('الاسم يجب أن يكون نصًا')
        .isLength({ max: 50 }).withMessage('الاسم لا يمكن أن يتجاوز 50 حرفًا')
        .notEmpty().withMessage('الاسم مطلوب')
        .trim().escape(),

    body('email')
        .isEmail().withMessage('يجب إدخال بريد إلكتروني صحيح')
        .isLength({ max: 100 }).withMessage('البريد الإلكتروني لا يمكن أن يتجاوز 100 حرف')
        .notEmpty().withMessage('البريد الإلكتروني مطلوب')
        .normalizeEmail(),

    body('content_subject')
        .isString().withMessage('الموضوع يجب أن يكون نصًا')
        .isLength({ max: 100 }).withMessage('الموضوع لا يمكن أن يتجاوز 100 حرف')
        .notEmpty().withMessage('الموضوع مطلوب')
        .trim().escape(),

    body('content')
        .isString().withMessage('المحتوى يجب أن يكون نصًا')
        .isLength({ max: 256 }).withMessage('المحتوى لا يمكن أن يتجاوز 256 حرف')
        .notEmpty().withMessage('المحتوى مطلوب')
        .trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateMessageId = [
    param('id')
        .isInt({ min: 1 }).withMessage('المعرف يجب أن يكون عددًا صحيحًا')
        .toInt(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateMessage,
    validateMessageId
};
