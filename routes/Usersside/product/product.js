const express = require('express');
const router = express.Router();
const listofproduct =require('../../../controllers/admin/product/listofproduct');

router.get('/listofproduct',listofproduct);

module.exports = router;