const { param, body, validationResult } = require('express-validator');

const validateCreateOrder = [
    body('note')
        .optional()
        .isString().withMessage('الملاحظة يجب أن تكون نصية.')
        .isLength({ max: 256 }).withMessage('الملاحظة لا يمكن أن تتجاوز 256 حرفًا.'),
    body('items')
        .isArray({ min: 1 }).withMessage('يجب تقديم عناصر الطلب.')
        .custom((items) => {
            items.forEach((item) => {
                if (!item.product_id || !item.quantity) {
                    throw new Error('كل عنصر يجب أن يحتوي على معرف المنتج والكمية.');
                }
                if (typeof item.product_id !== 'number' || typeof item.quantity !== 'number') {
                    throw new Error('معرف المنتج والكمية يجب أن يكونا أرقامًا.');
                }
            });
            return true;
        }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'فشل التحقق من الإدخال.', errors: errors.array() });
        }
        next();
    },
];


const validateStateBody = [
    body('state')
        .notEmpty().withMessage('يجب تحديد حالة الطلب.')
        .isIn(['بانتظار الاتصال', 'جاري التحضير', 'منتهية', 'مرفوضة', 'يتم التوصيل', 'بانتظار الاستلام', 'كل الطلبات'])
        .withMessage('الحالة غير صحيحة.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'فشل التحقق من الإدخال.', errors: errors.array() });
        }
        next();
    },
];

const validateOrderIdParam = [

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateCustomerIdParam = [
    param('customerId')
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

module.exports = {
    validateCreateOrder,
    validateStateBody,
    validateOrderIdParam,
    validateCustomerIdParam,
};
