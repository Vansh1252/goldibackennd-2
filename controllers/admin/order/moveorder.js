const order = require('../../../models/admins/order/order');
const bags = require('../../../models/admins/bags/bag');
const users = require('../../../models/admins/users/save');
const category = require('../../../models/admins/category/category');
const respondmanger = require('../../../utilities/respondmanger');
const constatnt = require('../../../utilities/constants');
const mongoose = require('mongoose');


const updateProcessingStatus = async (req, res) => {
    const { orderId, status } = req.body;

    if (!['processing', 'completed'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status.' });
    }

    try {
        const order = await Order.findById(orderId);

        if (!order || order.status !== 'processing') {
            return res.status(400).json({ message: 'Order is not in processing state.' });
        }

        order.status = status;
        order.updatedAt = Date.now();
        await order.save();

        res.json({ message: `Order moved to ${status} successfully.`, order });
    } catch (error) {
        res.status(500).json({ message: 'Error updating order status.', error });
    }
};

module.exports=updateProcessingStatus