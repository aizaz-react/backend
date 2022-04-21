const express=require('express');
const { signup, signin ,signout} = require('../../controller/admin/auth');
const {validateSignupRequest , isRequestValidated, validateSigninRequest } = require('../../validators/auth');

 
const router=express.Router();
const User = require('../../models/user');
const { requireSignin } = require('../../common-middleware');
const { sign } = require('jsonwebtoken');


router.post('/admin/signup',validateSignupRequest,isRequestValidated,signup);

router.post('/admin/signin',validateSigninRequest,isRequestValidated,signin);
router.post('/admin/signout',requireSignin,signout )








module.exports=router;