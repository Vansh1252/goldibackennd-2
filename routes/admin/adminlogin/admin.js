const express = require('express');
const router = express.Router();
const login = require('../../../controllers/admin/adminlogin/login');
// const admincreate =require('../../../controllers/admin/save.js');
// const authantication =require('../../../validator/loginvalidator.js');

router.post('/login',login);
// router.post('/createadmin',admincreate,);

module.exports = router;
