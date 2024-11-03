const productRepository = require('../repositories/productRepository');
const categoriesRepository = require('../repositories/categoriesRepository');

const productController = {

    getAllProducts: async (req, res) => {
        try {
            const { state } = req.params;
            const products = await productRepository.getAllProducts(state);
            if (products === -1) {
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
            const { id } = req.params;
            const product = await productRepository.getProductById(id);

            if (product) {
                res.json({ message: "تم جلب المنتج بنجاح", product });
            } else {
                res.status(404).json({ message: "المنتج غير موجود" });
            }
        } catch (error) {
            console.error("Error fetching product:", error);
            res.status(500).json({ message: "Server error", error });
        }
    },

    createProduct: async (req, res) => {
        try {
            const productData = req.body;

            const photoPath = req.file ? `uploads/products/${req.file.filename}` : null;
            productData.image_path = photoPath;

            const categoryExist = await categoriesRepository.getCategoryById(productData.category_id);
            if (!categoryExist) {
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
            const productData = req.body;
            const productId = req.params.id;

            const currentProduct = await productRepository.getProductById(productId);
            if (!currentProduct) {
                return res.status(404).json({ message: "المنتج غير موجود" });
            }

            if (req.file) {
                const newPhotoPath = `uploads/products/${req.file.filename}`;
                productData.image_path = newPhotoPath;
            } else {
                productData.image_path = currentProduct.image_path;
            }

            productData.id = currentProduct.id
            
            const updatedProduct = await productRepository.updateProductById(productId, productData);
            res.json({ message: "تم تحديث المنتج بنجاح", product: updatedProduct });
            
        } catch (error) {
            console.error("Error updating product:", error);
            res.status(500).json({ message: "خطأ في السيرفر" });
        }
    },        

    deleteProductById: async (req, res) => {
        try {
            const productId = req.params.id;
            const product = await productRepository.getProductById(productId);

            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            const imagePath = `httpdocs/${product.image_path}`;
            console.log(imagePath);
            if (imagePath && fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }

            const result = await productRepository.deleteProductById(productId);

            res.json({ message: "Product and image deleted successfully" });
        } catch (error) {
            console.error("Error deleting product and image:", error);
            res.status(500).json({ message: "Server error" });
        }
    },

    getProductsByCategory: async (req, res) => {
        try {
            const { category } = req.params;
            const products = await productRepository.getProductsByCategory(category);

            if (products.length > 0) {
                res.json({ message: "Products retrieved successfully", products });
            } else {
                res.status(404).json({ message: "No products found for this category" });
            }
        } catch (error) {
            console.error("Error fetching products by category:", error);
            res.status(500).json({ message: "Server error", error });
        }
    }

};

module.exports = productController;
