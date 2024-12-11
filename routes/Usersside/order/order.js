const express = require('express');
const router = express.Router();
const createanorder = require('../../../controllers/userside/order/orders');
const createanbag = require('../../../controllers/userside/order/bag');
const listoforder = require('../../../controllers/userside/order/listoforder');

router.post('/createorder', createanorder);
router.post('/createbag', createanbag);
router.get('/listoforder', listoforder);

module.exports = router;