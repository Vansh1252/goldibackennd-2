const jwt = require("jsonwebtoken");
const ResponseManger = require("../utilities/respondmanger");

const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return ResponseManger.badrequest(res, "Authorization header is missing.", 401);
        }

        const token = authHeader.split(" ")[1]; // Bearer <token>
        if (!token) {
            return ResponseManger.badrequest(res, "Authorization token is missing.", 401);
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.id) {
            return ResponseManger.badrequest(res, "Invalid token payload.", 401);
        }

        // Set user information in request
        req.user = { userid: decoded.id }; // Adjust 'id' as per your JWT payload structure
        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return ResponseManger.badrequest(res, "Invalid token.", 401);
        } else if (error.name === "TokenExpiredError") {
            return ResponseManger.badrequest(res, "Token has expired.", 401);
        } else {
            console.error("Authentication Middleware Error:", error);
            return ResponseManger.servererror(res, "An unexpected error occurred during authentication.", 500);
        }
    }
};

module.exports = authenticate;