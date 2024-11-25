const { body, validationResult, param } = require('express-validator');

const validateResarvation = [
    body('customer_id')
        .isNumeric().withMessage('رقم العميل يجب أن يكون رقمًا.')
        .isInt({ min: 0 }).withMessage('رقم العميل يجب أن يكون أكبر من أو يساوي 0.')
        .notEmpty().withMessage('رقم العميل مطلوب.'),

    body('table_id')
        .isNumeric().withMessage('رقم الطاولة يجب أن يكون رقمًا.')
        .isInt({ min: 0 }).withMessage('رقم الطاولة يجب أن يكون أكبر من أو يساوي 0.')
        .notEmpty().withMessage('رقم الطاولة مطلوب.'),

    body('time_of_resarvation')
        .notEmpty().withMessage('وقت الحجز مطلوب.')
        .isISO8601().withMessage('وقت الحجز يجب أن يكون تاريخًا ووقتًا بصيغة صحيحة (ISO 8601).')
        .toDate(),

    body('family_or_not')
        .isIn([0, 1]).withMessage('نوع الحجز يجب أن تكون إما 0 أو 1.')
        .notEmpty().withMessage('نوع الحجز مطلوب.'),

    body('details')
        .optional()
        .isString().withMessage('التفاصيل يجب أن يكون نصًا.')
        .isLength({ max: 200 }).withMessage('التفاصيل لا يمكن أن يتجاوز 200 حرف.')
        .trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateUpdateResarvation = [
    body('product_name')
        .isString().withMessage('اسم المنتج يجب أن يكون نصًا.')
        .isLength({ max: 100 }).withMessage('اسم المنتج لا يمكن أن يتجاوز 100 حرف.')
        .notEmpty().withMessage('اسم المنتج مطلوب.')
        .trim().escape(),

    body('description')
        .optional()
        .isString().withMessage('الوصف يجب أن يكون نصًا.')
        .isLength({ max: 200 }).withMessage('الوصف لا يمكن أن يتجاوز 200 حرف.')
        .trim().escape(),

    body('price')
        .isNumeric().withMessage('السعر يجب أن يكون رقمًا.')
        .isFloat({ min: 0 }).withMessage('السعر يجب أن يكون أكبر من أو يساوي 0.')
        .notEmpty().withMessage('السعر مطلوب.'),

    body('category_id')
        .isNumeric().withMessage('رقم الصنف يجب أن يكون رقمًا.')
        .isInt({ min: 0 }).withMessage('رقم الصنف يجب أن يكون أكبر من أو يساوي 0.')
        .notEmpty().withMessage('رقم الصنف مطلوب.'),

    body('calories')
        .optional()
        .isInt({ min: 0 }).withMessage('السعرات الحرارية يجب أن تكون عدد صحيح وغير سالب.'),

    body('status')
        .isIn([0, 1]).withMessage('الحالة يجب أن تكون إما 0 أو 1.')
        .notEmpty().withMessage('رقم الحالة مطلوب.'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateState = [
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

const validateProductId = [
    param('id')
        .isInt({ gt: 0 }).withMessage('رقم المنتج يجب أن يكون عدد صحيح موجب.')
        .notEmpty().withMessage('رقم المنتج مطلوب.'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateResarvation };
