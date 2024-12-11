const usermodel = require('../../../models/admins/users/save');
const ResponseManger = require('../../../utilities/respondmanger');
const constants = require('../../../utilities/constants');


const product_statuschange = async (req, res) => {
    try {
        const { _id } = req.body
        const user = await usermodel.findById(_id);
        if (!user) {
            return ResponseManger.badrequest(res, "User not found.");
        }
        // const newProductStatus = user.product_status === "true" ? false : true;
        user.product_status = !user.product_status;
        await user.save();
        return ResponseManger.onsuccess(res, user, "Product status has been updated successfully.");
    } catch (error) {
        return ResponseManger.servererror(res, "server error..");
    }

};

module.exports =product_statuschange