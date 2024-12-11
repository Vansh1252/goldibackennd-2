const Joi = require('joi');

const validateAuthentication = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().trim(),
        lastname: Joi.string().required().trim(),
        email: Joi.string().required().email().lowercase().trim(),
        mobileNumber: Joi.string().required().pattern(/^\+?[1-9][0-9]{7,14}$/).trim(),
        password: Joi.string().required().min(8),
    });
    return schema.validate(data, { abortEarly: true });
};

module.exports = validateAuthentication;