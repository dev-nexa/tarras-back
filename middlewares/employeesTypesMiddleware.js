const { body, param, validationResult } = require('express-validator');

const validateTypeId = [
    param('id')
        .isInt({ gt: 0 }).withMessage('معرف النوع يجب أن يكون رقماً صحيحاً'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateCreateType = [
    body('name')
        .isString().withMessage('اسم النوع يجب أن يكون نصاً')
        .isLength({ max: 50 }).withMessage('اسم النوع يجب ألا يتجاوز 50 حرفاً')
        .optional({ nullable: true }),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateUpdateType = [
    param('id')
        .isInt({ gt: 0 }).withMessage('معرف النوع يجب أن يكون رقماً صحيحاً'),
    body('name')
        .isString().withMessage('اسم النوع يجب أن يكون نصاً')
        .isLength({ max: 50 }).withMessage('اسم النوع يجب ألا يتجاوز 50 حرفاً')
        .optional({ nullable: true }),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateCreateType,
    validateTypeId,
    validateUpdateType
};
