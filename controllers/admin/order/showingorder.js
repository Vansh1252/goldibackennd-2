const order = require('../../../models/admins/order/order');
const bags = require('../../../models/admins/bags/bag');
const users = require('../../../models/admins/users/save');
const category = require('../../../models/admins/category/category');
const respondmanger = require('../../../utilities/respondmanger');
const constatnt = require('../../../utilities/constants');
const mongoose = require('mongoose');



const showing_order = async (rea, res) => {

    const { orderId } = req.body;
    try {
        if (orderId === null && !mongoose.Types.ObjectId.isValid(_id)) {
            return ResponseManger.badrequest(res, "enter an orderId...!");
        }
        const orders = await order.findOne(orderId).select('')
        if (orders === null) {
            return ResponseManger.badrequest(res, "invalid order Id...!");
        }
        return ResponseManger.onsuccess(res, constants.RESPONSE_MESSAGES.SUCCESS, orders);
    } catch (error) {
        return ResponseManger.servererror(res, error, "there is some problem in the server....");
    }
} 
module.exports = showing_order