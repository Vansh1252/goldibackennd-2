const usermodel = require('../../../models/admins/users/save');
const ResponseManger = require('../../../utilities/respondmanger');
const constants = require('../../../utilities/constants');

const getone = async (req, res) => {
    try {
        const { name, mobileNumber, status, product_status } = req.body;
        if (name || mobileNumber) {
            const query = {};
            if (name) {
                query.name = { $regex: name, $options: "i" };
            }
            if (mobileNumber) {
                query.mobileNumber = { $regex: mobileNumber, $options: "i" };
            }
            if (status === 'true') {
                query.status = true;
            } if (status === 'false') {
                query.status = false;
            }
            if (product_status === 'true') {
                query.product_status = true;
            } if (product_status === 'false') {
                query.product_status = false;
            }
            const users = await usermodel
                .find(query)
                .select("-email -password -deleted -createdBy -createdAt -updatedAt -__v");

            if (!users && users !== undefined && users !== null && typeof users !== 'string') {
                return ResponseManger.badrequest(res, "No users found.");
            }
            return ResponseManger.onsuccess(res, users, "Users fetched successfully.");
        }
        return ResponseManger.badrequest(res, "Invalid input. Provide valid parameters.");
    } catch (error) {
        console.error("Error in getone:", error);
        return ResponseManger.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

module.exports = getone;