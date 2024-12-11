const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const usersRouter = require('./routes/admin/user/users.js');
const adminrouter =require('./routes/admin/adminlogin/admin.js');
const categoryrouter=require('./routes/admin/category/categorys.js');
const productrouter =require('./routes/admin/product/products.js')
const userrouter =require('./routes/Usersside/login/userlogin.js');
const userorder =require('./routes/Usersside/order/order.js');
const adminorder =require('./routes/admin/orders/order.js')
const connectDB = require('./utilities/connection.js');

dotenv.config(); // Load environment variables

const DATABASE_URL = process.env.DATABASE_URL;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to the database
if (!DATABASE_URL || !process.env.JWT_SECRET) {
  console.error("Missing environment variables. Please check DATABASE_URL and JWT_SECRET.");
  process.exit(1);
}
connectDB(DATABASE_URL);

// Define routes
app.use('/admin',adminrouter);
app.use('/users',usersRouter);
app.use('/category',categoryrouter);
app.use('/product',productrouter);
app.use('/userlogin',userrouter);
app.use('/order',userorder);
app.use('/orders',adminorder)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;