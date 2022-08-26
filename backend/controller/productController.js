const productModel = require("../models/productModel");

// POST -- create product -- Admin
exports.createProduct = async (req, res, next) => {

  const product = await productModel.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
  
};

// GET -- get all product
exports.getAllProducts = async (req, res, next) => {

  const products = await productModel.find();
  res.status(201).json({
    success: true,
    products,
  });

};

//  GET -- get product details
exports.getProductDetails = async (req, res, next) => {

  const product = await productModel.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });  
  }

  res.status(200).json({
    success: true,
    product
  });
  
};

// PUT -- update Product -- Admin
exports.updateProduct = async (req, res) => {

  let product = await productModel.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }

  product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });

};

// DELETE -- Product -- Admin
exports.deleteProduct = async (req, res) => {

  const product = await productModel.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }

  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });

};
