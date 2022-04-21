const Product=require('../models/product');
const  shortid =require('shortid');
const slugify=require('slugify');
exports.createProduct = (req, res) => {
    
    const { name, price, description, brand, category,  Stock, createdBy,size, colour  } = req.body;
    let productPicture = [];
    // let size = [];
    // let colour = [];
  
    if (req.files.length > 0) {
      productPicture = req.files.map((file) => {
        return { img: file.location };
      });
    }
  
    const product = new Product({
      name: name,
      slug: slugify(name),
      size,
      colour,
      price,
      Stock ,
      description,
      brand,
      productPicture,
      category,
      createdBy: req.user._id,
    });
    
  //console.log(product);
    product.save((error, product) => {
      if (error) return res.status(400).json({ error });
      if (product) {
        res.status(201).json({ product, files: req.files });
      }
      console.log(req.body);
    });
  };


//   update product
  exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
  
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found!" })
    }
    // let productPicture = [];
    let new_image=[];
    if (req.file) {
      new_image = req.file.filename;
      try{
        fs.unlinkSync("./uploads/"+req.body.old_image);
      }catch (err){
         console.log(err);
      }
     
       }else{
         new_image=req.body.old_image;
       }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      name:req.body.name,
      size:req.body.size,
      colour:req.body.colour,
      productPicture :new_image,
      price:req.body.price,
      description:req.body.description,
      // brand:req.body.brand,
      
      category:req.body.catagory, 
     
    });
    
  
    res.status(200).json({
      success: true, message: "Product updated successfully ",
      product,
    });
  });


 