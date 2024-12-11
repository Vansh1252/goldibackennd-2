const Product = require('../../../models/category/category');
const ResponseManager = require('../../../utilities/respondmanger');


const getUserProducts = async (req, res) => {
    
    try {
        const products = await Product.find({ status: true }).select('-__v -createdAt -updatedAt');
        return ResponseManager.onsuccess(res, products, 'Products fetched successfully.');
    } catch (error) {
        console.error('Error fetching products:', error);
        return ResponseManager.servererror(res, 'Error fetching products.');
    }
};

module.exports =  getUserProducts;  
  
   
 