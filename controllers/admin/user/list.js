const usermodel = require('../../../models/admins/users/save');
const ResponseManager = require('../../../utilities/respondmanger');
const users = async (req, res) => {
    try {
        const { status, product_status, } = req.body;
        let query = {};
        if (status === 'true') {
            query.status = true;
        } else if (status === 'false') {
            query.status = false;
        }
        if (product_status === 'true') {
            query.product_status = 'true';
        } else if (product_status === 'false') {
            query.product_status = 'false';
        }
        const listOfUsers = await usermodel
            .find(query)
            .select('-password -__v -deleted -createdBy -createdAt -updatedAt -email');
        return ResponseManager.onsuccess(res, listOfUsers, "Fetched user list successfully.");
    } catch (error) {
        console.error("Error fetching user list:", error);
        return ResponseManager.servererror(res, "Failed to fetch user list.");
    }
};
module.exports = users;