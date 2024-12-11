const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const usermodel = require("../../../models/admins/users/save");
const ResponseManger = require("../../../utilities/respondmanger");
const constants = require("../../../utilities/constants");
const authenticate = require('../../../validator/adminmiddleware');

const userhandler = async (req, res) => {
    try {
        const { _id, name, lastname, mobileNumber, email, password, confirmpassword } = req.body;
        const adminId = process.env.AdminId;
        if (!adminId) {
            return ResponseManger.badrequest(res, "Admin ID is missing. Ensure you are authenticated.", 400);
        }
        if (_id) {
            if (!mongoose.Types.ObjectId.isValid(_id)) {
                return ResponseManger.badrequest(res, "Invalid User ID.", 400);
            }
            const updateFields = { name, lastname, mobileNumber, email };
            if (password) {
                if (password !== confirmpassword) {
                    return ResponseManger.badrequest(res, "Passwords do not match.", 400);
                }
                updateFields.password = password;
            }
            const updateuser = await usermodel.findByIdAndUpdate(_id, updateFields, { new: true });
            if (!updateuser) {
                return ResponseManger.badrequest(res, "User not found.", 404);
            }
            const { password: pwd, __v, ...userdata } = updateuser.toObject();
            return ResponseManger.onsuccess(res, userdata, "User has been updated successfully.", 200);
        }
        if (!name || !lastname || !email || !mobileNumber || !password || !confirmpassword) {
            return ResponseManger.badrequest(res, "All fields are required.", 400);
        }

        if (password !== confirmpassword) {
            return ResponseManger.badrequest(res, "Passwords do not match.", 400);
        }

        const existing = await usermodel.findOne({ mobileNumber });
        if (existing) {
            return ResponseManger.badrequest(res, "Mobile number already exists.", 400);
        }
        const saltRounds = constants.CONFIG?.SALT_ROUNDS || 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        const createuser = new usermodel({
            name,
            lastname,
            email,
            mobileNumber,
            password: hashedPassword,
            createdBy: adminId,
        });

        await createuser.save();

        const { password: pwd, __v, ...userdata } = createuser.toObject();
        return ResponseManger.onsuccess(res, userdata, constants.RESPONSE_MESSAGES.USER_CREATED, 201);

    } catch (error) {
        console.error("Error in userhandler:", error);

        if (error.code === 11000 && error.keyValue?.email) {
            return ResponseManger.badrequest(res, "Email already exists.", constants.HTTP_STATUS.BAD_REQUEST);
        }
        return ResponseManger.servererror(res, "Something went wrong with the server.", 500);
    }
};

module.exports = userhandler;