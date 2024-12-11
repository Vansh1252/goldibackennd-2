const order = require('../../../models/admins/order/order');
const bags = require('../../../models/admins/bags/bag');
const users = require('../../../models/admins/users/save');
const category = require('../../../models/admins/category/category');
const respondmanger = require('../../../utilities/respondmanger');
const constatnt = require('../../../utilities/constants');
const mongoose = require('mongoose');

const managebags = async (req, res) => {
    const { userId, categoryId, products, bagDescription } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(categoryId)) {
            return respondmanger.badrequest(res, "Invalid user or category ID.");
        }

        const user = await users.findOne({ _id: userId });
        if (!user) {
            return respondmanger.badrequest(res, "User not found.");
        }

        const categorys = await category.findOne({ _id: categoryId });
        if (!categorys) {
            return respondmanger.badrequest(res, "Category not found.");
        }

        if (!Array.isArray(products) || products.length === 0) {
            return respondmanger.badrequest(res, "Products array must not be empty.");
        }

        //check if the product is from the categories its belongs
        for (const product of products) {
            if (!mongoose.Types.ObjectId.isValid(product.productId)) {
                return respondmanger.badrequest(res, "Invalid product ID.");
            }

            const productDetails = categorys.products.find((p) => p._id.toString() === product.productId);
            console.log(productDetails);

            if (!productDetails) {
                return respondmanger.badrequest(
                    res,
                    `Product ${product.productId} does not belong to category ${categoryId}.`
                );
            }
        }
        // check if the bag is existing bag
        const existingBag = await bags.findOne({ userId, categoryId });
        if (existingBag) {
            for (const product of products) {
                if (!mongoose.Types.ObjectId.isValid(product.productId)) {
                    return respondmanger.badrequest(res, "Invalid product ID.");
                }
                const productIndex = existingBag.products.findIndex(
                    (p) => p.productId.toString() === product.productId
                );
                if (productIndex > -1) {
                    // If product exists, update quantity
                    existingBag.products[productIndex].quantity += product.quantity;
                } else {
                    // If product doesn't exist, add it
                    existingBag.products.push({
                        productId: product.productId,
                        quantity: product.quantity,
                        productPhoto: product.productPhoto,
                        productDescription: product.productDescription
                    });
                }
            }
            existingBag.updatedBy = Date.now();
            await existingBag.save();
            return respondmanger.onsuccess(res, existingBag, "Bag updated successfully.");
        }
        // Create a new bag
        const newBag = new bags({
            userId,
            categoryId,
            products: products.map((product) => ({
                productId: product.productId,
                quantity: product.quantity,
                productPhoto: product.productPhoto,
                productDescription: product.productDescription
            })),
            bagDescription
        });
        await newBag.save();
        return respondmanger.onsuccess(res, newBag, "Bag created successfully.");
    } catch (error) {
        console.error("Error:", error);
        return respondmanger.servererror(res, constatnt.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};
module.exports = managebags