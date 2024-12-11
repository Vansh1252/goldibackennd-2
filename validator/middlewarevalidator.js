const ResponseManager = require("../utilities/respondmanger");
const validateAuthentication = require('../validator/loginvalidator');

const validateMiddleware = (validationFunction) => {
    return (req, res, next) => {
        const { error } = validationFunction(req.body);
        if (error) {
            // Provide the specific validation error message
            return ResponseManager.badrequest(res, "Validation error: " + error.details[0].message);
        }
        next();
    };
};

module.exports = validateMiddleware;