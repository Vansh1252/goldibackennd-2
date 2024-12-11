// const bcrypt = require("bcrypt");
// const mongoose = require("mongoose");
// const adminmodel = require("../../models/admin/login");
// const ResponseManger = require("../../utilities/respondmanger");
// const constants = require("../../utilities/constants");

// const admincreate = async (req, res) => {
//     const { email, password, confirmpassword } = req.body;

//     try {
//         if (!email || !password || !confirmpassword) {
//             return ResponseManger.badrequest(res, "Please provide email, password, and confirm password.");
//         }

//         if (password !== confirmpassword) {
//             return ResponseManger.badrequest(res, "Passwords do not match.");
//         }

//         const existingAdmin = await adminmodel.findOne({ email });
//         if (existingAdmin) {
//             return ResponseManger.badrequest(res, "Admin with this email already exists.");
//         }

//         const create = new adminmodel({
//             email,
//             password, // Raw password; hashing is handled in schema pre-save middleware
//         });

//         await create.save();
//         const { password: pwd, __v, ...userdata } = create.toObject();
//         return ResponseManger.onsuccess(res, "Admin user has been created successfully.", userdata);

//     } catch (error) {
//         console.error("Error in admincreate:", error);
//         return ResponseManger.servererror(res, "There was a problem creating the admin.");
//     }
// };

// module.exports =admincreate