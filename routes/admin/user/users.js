const express = require('express');
const router = express.Router();
const newuserhandler = require('../../../controllers/admin/user/save.js');
const userhandler = require('../../../controllers/admin/user/getone.js');
const listhandler = require('../../../controllers/admin/user/list.js')
const changestatus =require('../../../controllers/admin/user/status.js')
const changeproduct_status=require('../../../controllers/admin/user/product_status.js');
// const authantication =require('../../validator/loginvalidator.js');

router.post('/users',newuserhandler);
router.post('/getone',userhandler);
router.get('/listofuser',listhandler);
router.get('/changestatus',changestatus);
router.get('/changeproductstatus',changeproduct_status);

module.exports = router;
