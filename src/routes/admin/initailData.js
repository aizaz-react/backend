const express=require('express');
const { initialData } = require('../../controller/admin/initail.Data');
 const router=express.Router();
const User = require('../../models/user');


router.post('/initialdata',initialData);



module.exports=router;