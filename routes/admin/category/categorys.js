const express = require('express');
const router = express.Router();
const newcategory =require('../../../controllers/admin/category/save');
const listofcategory =require('../../../controllers/admin/category/listofcategorys');

router.post('/addcategory',newcategory);
router.get('/listofcategory',listofcategory);

module.exports = router;