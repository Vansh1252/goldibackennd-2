const order = require('../../../models/admins/order/order');
const bags = require('../../../models/admins/bags/bag');
const users = require('../../../models/admins/users/save');
const category = require('../../../models/admins/category/category');
const respondmanger = require('../../../utilities/respondmanger');
const constatnt = require('../../../utilities/constants');
const mongoose = require('mongoose');



const listoforder = async (rea, res) => {
    try {
        const orderlist = await order.find().select('-updatedAt -createdAt')
        if (orderlist === null) {
            return ResponseManger.badrequest(res, "there is no order ....!");
        }
        return ResponseManger.onsuccess(res, "done...", orderlist)
    } catch (error) {
        return ResponseManger.servererror(res, error, "there is some problem in the server....");
    }
}
module.exports =listoforder