const express=require('express');
const { signup, signin, requireSignin } = require('../../controller/admin/auth');
 
const router=express.Router();
const User = require('../../models/user');


router.post('/admin/signup',signup);



router.post('/admin/signin',signin);








module.exports=router;