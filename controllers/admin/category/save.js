const mongoose = require('mongoose')
const categorymodel = require('../../../models/admins/category/category');
const ResponseManger = require("../../../utilities/respondmanger");
const constants = require("../../../utilities/constants");

const newcategory = async (req, res) => {
    try {
        const { _id, name } = req.body;
        const adminId = process.env.AdminId;
        if (adminId === null) {
            return ResponseManger.badrequest(res, "Admin ID is missing. Ensure you are authenticated.", 400);
        }
        if (name === null) {
            return ResponseManger.badrequest(res, constants.RESPONSE_MESSAGES.BAD_REQUEST);
        }
        if (_id) {
            if (!mongoose.Types.ObjectId.isValid(_id)) {
                return ResponseManger.badrequest(res, 'Invalid category ID.');
            }
            const duplicateCategory = await categorymodel.findOne({ name });
            if (duplicateCategory) {
                return ResponseManger.badrequest(res, 'A category with this name already exists.');
            }
            const updatecategory = await categorymodel.findByIdAndUpdate(
                _id,
                { name },
                { new: true }
            );
            if (!updatecategory) {
                return ResponseManger.badrequest(res, constants.RESPONSE_MESSAGES.CATEGORY_NOT_FOUND);
            }
            return ResponseManger.onsuccess(res, updatecategory, "the category has been updated...");
        } const existingCategory = await categorymodel.findOne({ name });
        if (existingCategory) {
            return ResponseManger.badrequest(res, 'A category with this name already exists.');
        }
        const category = new categorymodel({ name, createdBy: adminId });
      
        if (!category) {
            return ResponseManger.badrequest(res, "category is not created...");
        }
        await category.save();
        return ResponseManger.onsuccess(res, category, "CATEGORY CREATED SUCCESSFULLY...");
    } catch (error) {
        return ResponseManger.servererror(res, 'Error creating/updating category.');
    }
};
module.exports = newcategory