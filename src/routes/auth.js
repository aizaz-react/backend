const express=require('express');
const { signup, signin } = require('../controller/auth');
 
const router=express.Router();
const User = require('../models/user');


router.post('/signup',signup);



router.post('/signin',signin);







module.exports=router;