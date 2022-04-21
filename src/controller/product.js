const Product = require("../models/product");
const shortid = require("shortid");
const slugify = require("slugify");
const catchAsyncErrors = require("../common-middleware/catchAsyncErrors");
const ErrorHander = require("../common-middleware/errorhander");
exports.createProduct = (req, res) => {
  const {
    name,
    price,
    description,
    brand,
    category,
    Stock,
    createdBy,
    size,
    colour,
  } = req.body;
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
    Stock,
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
    return res
      .status(404)
      .json({ success: false, message: "Product not found!" });
  }
  let { productPicture } = product;

  // let productPicture = [];
  // let new_image = [];
  // if (req.file) {
  //   new_image = req.file.filename;
  //   try {
  //     fs.unlinkSync("./uploads/" + req.body.old_image);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // } else {
  //   new_image = req.body.old_image;
  // }
  // console.log(new_image);
  let { body, files } = req;
  let reqFiles = files.map((file) => {
    return { img: file.location };
  });

  console.log(...files);
  product = await Product.findOneAndUpdate(req.params.id, {
    ...body,
    productPicture: [...productPicture, ...reqFiles],
  });

  res.status(200).json({
    success: true,
    message: "Product updated successfully ",
    product,
  });
});

exports.allProducts = async (req, res) => {
  try {
    let products = await Product.find({});
    console.log(products);
    res.send(products);
  } catch (error) {
    res.status(400).send("error");
  }
};
