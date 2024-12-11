const Category = require('../../../models/admins/category/category');
const ResponseManager = require('../../../utilities/respondmanger');

const addProductToCategory = async (req, res) => {
    try {
        const { categoryid } = req.body;
        if (!categoryid) {
            return ResponseManager.badrequest(res, 'Category ID is required.');
        }
        const category = await Category.findById(categoryid);
        if (!category) {
            return ResponseManager.badrequest(res, 'Category not found.');
        }
        if (!req.file) {
            return ResponseManager.badrequest(res, 'Product image is required.');
        }
        const newProduct = {
            imageUrl: `/uploads/${req.file.filename}`,
        };
        category.products.push(newProduct);
        await category.save();
        return ResponseManager.onsuccess(res, 'Product added successfully.', category);
    } catch (error) {
        console.error('Error adding product:', error);
        return ResponseManager.servererror(res, 'Error adding product to category.');
    }
};
module.exports = addProductToCategory;