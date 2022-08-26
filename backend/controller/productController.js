const productModel = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError")

// POST -- create product -- Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {

  const product = await productModel.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
  
});

// GET -- get all product
exports.getAllProducts = catchAsyncError(async (req, res, next) => {

  const products = await productModel.find();
  res.status(201).json({
    success: true,
    products,
  });

});

//  GET -- get product details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {

  const product = await productModel.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404))
  }

  res.status(200).json({
    success: true,
    product
  });

});

// PUT -- update Product -- Admin
exports.updateProduct = catchAsyncError(async (req, res) => {

  let product = await productModel.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404))
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

});

// DELETE -- Product -- Admin
exports.deleteProduct = catchAsyncError(async (req, res) => {

  const product = await productModel.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404))
  }

  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });

});
