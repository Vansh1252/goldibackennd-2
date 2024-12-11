const express = require('express');
const router = express.Router();
const listofcategory =require('../../../controllers/admin/category/listofcategorys');

router.get('/listofcategory',listofcategory);

module.exports = router;