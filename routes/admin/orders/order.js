const express =require('express');
const router =express.Router();
const listoforder =require('../../../controllers/admin/order/listoforder');
const updateOrderStatus =require('../../../controllers/admin/order/bags');
const moveorder =require('../../../controllers/admin/order/moveorder');
const showing_order =require('../../../controllers/admin/order/showingorder');
const viewallorder =require('../../../controllers/admin/order/viewallorder');


router.get('/listoforder',listoforder);
router.get('/updateorderstatus',updateOrderStatus);
router.get('/moveorder',moveorder);
router.get('/showingorder',showing_order);
router.get('/viewallorder',viewallorder);

module.exports =router
