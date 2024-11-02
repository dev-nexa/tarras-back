const { body, validationResult, param } = require('express-validator');

const validateId = [
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

const validateCategory = [
    body('name')
        .isString().withMessage('اسم الصنف يجب أن يكون نصًا.')
        .isLength({ max: 100 }).withMessage('اسم الصنف لا يمكن أن يتجاوز 50 حرف.')
        .notEmpty().withMessage('اسم الصنف مطلوب.')
        .trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];


module.exports = { validateId, validateCategory };
