const constants = {
    HTTP_STATUS: {
        OK: 200,
        CREATED: 201,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        INTERNAL_SERVER_ERROR: 500,
    },
    RESPONSE_MESSAGES: {
        SUCCESS: "Operation successful.",
        USER_CREATED: "User created successfully.",
        BAD_REQUEST: "Invalid input data.",
        SERVER_ERROR: "Internal server error.",
    },
    ROLES: {
        ADMIN: "admin",
        USER: "user",
    },
    CONFIG: {
        SALT_ROUNDS: 10,
        JWT_EXPIRY: "7d",
    },
    REGEX: {
        EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    USER_STATUS: {
        ACTIVE: true,
        INACTIVE: false,
    },
    API_LIMITS: {
        MAX_UPLOAD_SIZE: 5 * 1024 * 1024,
    }
};

module.exports = constants;