const express = require('express');
const router = express.Router();
const addProductToCategory = require('../../../controllers/admin/product/save');
const upload = require('../../../utilities/multer');
const listofproduct =require('../../../controllers/admin/product/listofproduct');

router.post('/newproduct', [upload.single('image'), addProductToCategory]);
router.get('/listofproduct',listofproduct)

module.exports = router;