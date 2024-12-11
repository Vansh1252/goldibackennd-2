const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ResponseManager = require("../../../utilities/respondmanger");
const usermodel = require('../../../models/admins/users/save')
const constants = require('../../../utilities/constants');


const loginofuser = async (req, res) => {
    const { mobileNumber, password } = req.body
    try {
        if (mobileNumber === null && password === null) {
            return ResponseManager.badrequest(res, "Please Provide both mobileNumber and password...!")
        } if (mobileNumber === null) {
            return ResponseManager.badrequest(res, "Please provide mobileNumber..!");
        } if (password === null) {
            return ResponseManager.badrequest(res, "Please provide password...!");
        }
        let login = await usermodel.findOne({ mobileNumber });
        if (login === null) {
            return ResponseManager.badrequest(res, constants.RESPONSE_MESSAGES.BAD_REQUEST);
        }
        let isPasswordValid = await bcrypt.compare(password, login.password);
        if (isPasswordValid) {
            return ResponseManager.badrequest(res, "Invalid Password..!");
        }
        let token = jwt.sign(
            { userid: login._id, mobileNumber: login.mobileNumber },
            process.env.JWT_SECRET,
        );
        return ResponseManager.onsuccess(res, token, "login successfully");

    } catch (error) {
        return ResponseManager.servererror(res, "An unexpected error occurred.");
    }
}
module.exports = loginofuser