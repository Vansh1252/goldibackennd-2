const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ResponseManager = require("../../../utilities/respondmanger");
const adminmodel = require("../../../models/admins/admin/login");
const constants =require('../../../utilities/constants');

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate input
        if (!email || !password) {
            return ResponseManager.badrequest(res, "Please provide both email and password.");
        }
        const admin = await adminmodel.findOne({ email });
        // console.log(admin);
        if (!admin) {
            return ResponseManager.badrequest(res, "Invalid email or password.");
        }

        // Check if password matches
        const isPasswordValid = await bcrypt.compare(password,admin.password);
        // console.log("password",isPasswordValid);
        // console.log(password);
        // console.log(admin.password);
        if (!isPasswordValid) {
            return ResponseManager.badrequest(res, "Invalid email or password.");
        }

        // Generate JWT token
        const token = jwt.sign(
            { userid: admin._id, email: admin.email },
            process.env.JWT_SECRET,
        );

        // Return success response with token
        return ResponseManager.onsuccess(res, { token }, "Login successful.");

    } catch (error) {
        console.error("Error during login:", error);
        return ResponseManager.servererror(res, "An unexpected error occurred.");
    }
};

module.exports = login;