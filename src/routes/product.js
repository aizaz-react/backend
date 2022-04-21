const express=require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const { createProduct } = require('../controller/product');
const multer = require('multer');
// some middle ware to upload the file
const mongoose=require('mongoose');
const router=express.Router();
const shortid=require ('shortid');
const path =require('path');



router.get('/product/create', function(req, res) {
  res.render('product');
  
});



// data storage
const storage = multer.diskStorage({
    destination: function (req,  file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function  (req, file, cb) {
       cb(null, shortid.generate() + '-' + file.originalname)
    }
  })
//   const upload =multer({dest:'uploads/'});
  
  const upload = multer({ storage});
  
     router.post('/product/create',upload.array('productPicture'),createProduct);
// router.post('/product/create',requireSignin,adminMiddleware,upload.array('productPicture'),createProduct);
router.put('product/update/:id',updateProduct);




module.exports=router;  