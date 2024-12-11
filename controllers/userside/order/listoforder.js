const order = require('../../../models/admins/order/order');
const respondmanger = require('../../../utilities/respondmanger');
const constatnt = require('../../../utilities/constants');

const listoforder = async (res, req) => {
    try {
        const list = await order.find().select('-createdAt updatedAt');
        if(list===null){
            return respondmanger.badrequest(res,"There is no order...!");
        }
        return respondmanger.onsuccess(res,list,"all the order has been fetched...!");
    } catch (error) {
        return respondmanger.servererror(res,"something went wrong...!");
    }
};

module.exports=listoforder