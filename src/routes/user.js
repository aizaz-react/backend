const express=require('express');
const { signup } = require('../controller/user');
 
const router=express.Router();
const User = require('../models/user');


router.post('/signup',signup);



router.post('/signin',(req,res)=>{

});







module.exports=router;