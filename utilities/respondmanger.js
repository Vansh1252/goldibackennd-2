class ResponseManger {
    static onsuccess(res, data = {}, message = "", statuscode = 200) {
        return res.status(statuscode).json({
            success: true,
            message,
            data
        });
    }
    static badrequest(res, message = "Something went wrong", statuscode = 400, errors = "") {
        return res.status(statuscode).json({
            success: false,
            message,
            errors
        });
    }
    static servererror(res, message = "error in the server ", statuscode = 500,) {
        return res.status(statuscode).json({ success: false, message })
    }
};

module.exports = ResponseManger;