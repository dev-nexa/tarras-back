const categoriesRepository = require('../repositories/categoriesRepository');

const categoriesController = {
    createCategory: async (req, res) => {
        try {
            const { name } = req.body;
            const result = await categoriesRepository.createCategory({ name });
    
            if (result) {
                res.status(201).json({ message: "Category created successfully" });
            } else {
                res.status(400).json({ message: "Failed to create category" });
            }
        } catch (error) {
            console.error("Error creating category:", error);
            res.status(500).json({ message: "Server error", error });
        }
    },
    
    getAllCategories: async (req, res) => {

    },

    getCategoryById: async (req, res) => {
        try {
            const { id } = req.params;
            const category = await categoriesRepository.getCategoryById(id);

            if (category) {
                res.status(200).json({ message: "Category retrieved successfully", category });
            } else {
                res.status(404).json({ message: "Category not found" });
            }

        } catch (error) {
            console.error("Error fetching category:", error);
            res.status(500).json({ message: "Server error", error });
        }
    },

    

    updateCategoryById: async (req, res) => {
        try {

        } catch (error) {

        }
    },

    deleteCategoryById: async (req, res) => {
        try {

        } catch (error) {

        }
    }
};

module.exports = categoriesController;
