const Category = require('../../models/category/category');
const ResponseManager = require('../../utilities/respondmanger');

const getProducts = async (req, res) => {
    try {
        const {categoryId} =req.body
        const categories = await Category.find().select('name products').exec();

        if (!categories || categories.length === 0) {
            return ResponseManager.notfound(res, 'No categories or products found.');
        }
        const productList = categories.map((category) => ({
            categoryName: category.name,
            products: category.products,
        }));
        return ResponseManager.onsuccess(res, 'Products fetched successfully.', productList);
    } catch (error) {
        console.error('Error fetching products:', error);
        return ResponseManager.servererror(res, 'Failed to fetch products.');
    }
};

module.exports = getProducts;
