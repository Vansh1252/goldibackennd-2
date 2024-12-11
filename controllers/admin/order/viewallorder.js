const order = require('../../../models/admins/order/order');
const bags = require('../../../models/admins/bags/bag');
const users = require('../../../models/admins/users/save');
const category = require('../../../models/admins/category/category');
const respondmanger = require('../../../utilities/respondmanger');
const constatnt = require('../../../utilities/constants');
const mongoose = require('mongoose');

 const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate({
                path: 'bags',
                populate: { path: 'products.productId', select: 'name photo description' }
            })
            .populate('userId', 'name email');
            
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders.', error });
    }
};

module.exports =getAllOrders;