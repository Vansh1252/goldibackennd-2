const categorymodel = require('../../../models/admins/category/category');
const ResponseManger = require("../../../utilities/respondmanger");
const constants = require("../../../utilities/constants");


const listofcategory =async (req,res) =>{
    try {   
        const allcategory =await categorymodel.find({}).select( '-createdBy -__v -createdAt -updatedAt' );
        return ResponseManger.onsuccess(res,allcategory,"the list of category..");
    } catch (error) {
        return ResponseManger.servererror(res,error,"there is some problem in the server....");
    }
};
module.exports =listofcategory
 
  
   
 