const { body, validationResult, param } = require('express-validator');

const validateLocation = [
    body('region')
        .isString().withMessage('المنطقة يجب ان تكون سلسلة نصية.')
        .notEmpty().withMessage('المنطقة مطلوبة.')
        .isLength({ max: 100 }).withMessage('المنطقة يجب ان لا تتجاوز ال100 محرف.')
        .trim()
        .escape(),
    
    body('price')
        .isDecimal().withMessage('السعر يجب ان يكون رقما.')
        .notEmpty().withMessage('السعر مطلوب.')
        .custom(value => value > 0).withMessage('السعر يجب ان يكون اكبر من الصفر.'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateLocationId = [
    param('id')
        .isInt({ gt: 0 }).withMessage('المعرف يجب ان يكون رقما اكبر من الصفر.')
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
    validateLocation,
    validateLocationId
};
