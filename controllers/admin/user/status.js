const usermodel = require('../../../models/admins/users/save');
const ResponseManger = require('../../../utilities/respondmanger');
const constants = require('../../../utilities/constants');


const statuschange = async (req, res) => {
    try {
        const { _id } = req.body
        let user = await usermodel.findById(_id);
        if (!user) {
            return ResponseManger.badrequest(res, "User not found.");
        }
        // let newStatus = user.status === "true" ? false : true;
        user.status =!user.status;
        await user.save();

        return ResponseManger.onsuccess(res, user, "Status has been updated successfully.");
    } catch (error) {
        return ResponseManger.servererror(res, "server error..");
    }
};

module.exports = statuschange