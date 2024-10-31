const productRepository = require('../repositories/productRepository');
const categoriesRepository = require('../repositories/categoriesRepository');

const productController = {

    getAllProducts: async (req, res) => {
        try {
            const { state } = req.params;
            const products = await productRepository.getAllProducts(state);
            if(products === -1) {
                res.status(400).json({ message: "يجب ان تكون الحالة صحيحة" });
            } else {
                res.json({ message: "تم جلب جميع المنتجات بنجاح", products });
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            res.status(500).json({ message: "Server error", error });
        }
    },

    getProductById: async (req, res) => {
        try {

        } catch (error) {

        }
    },

    createProduct: async (req, res) => {
        try {
            const productData = req.body;
            
            const photoPath = req.file ? `uploads/products/${req.file.filename}` : null;

            productData.image_path = photoPath;

            const categoryExist = await categoriesRepository.getCategoryById(productData.category_id);
            if(!categoryExist) {
                return res.status(400).json({
                    message: 'لا يوجد صنف يحمل هذا المعرف',
                    product: productData
                });
            }
            
            const newProduct = await productRepository.createProduct(productData);
            if (newProduct === -1) {
                res.status(400).json({
                    message: 'الرقم المدخل  موجود مسبقا',
                    product: productData
                });
            } else {
                res.status(201).json({
                    message: 'تم ادخال المنتج',
                    product: newProduct,
                });
            }
        } catch (error) {
            console.error("Error creating product:", error);
            res.status(500).json({ message: "Server error", error });
        }
    },

    updateProductById: async (req, res) => {
        try {

        } catch (error) {

        }
    },

    deleteProductById: async (req, res) => {
        try {

        } catch (error) {

        }
    },

    getProductsByCategory: async (req, res) => {
        try {

        } catch (error) {

        }
    }
};

module.exports = productController;
