const express=require('express');
const { signup, signin } = require('../controller/auth');
 const { collection } = require('../models/user');
const { validateSignupRequest, isRequestValidated,validateSigninRequest } = require('../validators/auth');
const router=express.Router();
const User = require('../models/user');



router.post('/signup',validateSignupRequest,isRequestValidated, signup);




router.post('/signin', validateSigninRequest,isRequestValidated,signin);




// router.post('/profile', requireSignin,(req,res)=>{

//    res.status(200).json({user:'profile'})
// });






module.exports=router;