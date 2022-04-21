const express = require('express');
const request=require('request');
const bodyParser = require('body-parser');
const router = express.Router();
const { signup, signin ,signout} = require('../controller/admin/auth');
const {validateSignupRequest , isRequestValidated, validateSigninRequest } = require('../validators/auth');
const User = require('../models/user');
const { requireSignin } = require('../common-middleware/index');
const { sign } = require('jsonwebtoken');
const secretkey='6Ld5FOAeAAAAALUWlTwWCWGRC3eh5xf4VuRO-6wu';
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

// cookiee parser
router.use(cookieParser('SecretStringForCookies'));
router.use(session({
  secret:'SecretStringForSession',
  cookie:{maxAge:6000},
  saveUninitialized: true,
  resave: true
}));
router.use(flash());

  

/* GET home page. */
router.get('/', function(req, res, next) {
 
  res.render('index');
});
router.get('/adminsignup', function(req, res, next) {
  res.render('adminsignup');
});
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard');
});
router.get('/product', function(req, res, next) {
  res.render('product');
});
router.get('/test', function(req, res, next) {
 
  res.render('AdminsignupForm');
});
router.get('/usersignup', function(req, res, next) {
 
  res.render('user');
});


router.get('/catagory', function(req, res, next) {
  res.render('catagory');
});
router.post('/admin/signup',validateSignupRequest,isRequestValidated,signup);



   


module.exports = router;
