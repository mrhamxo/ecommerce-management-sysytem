const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

// create new order
exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await orderModel.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// get single order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await orderModel
    .findById(req.params.id)
    .populate("user", "name email"); // user is undefined, will work on it after some time

  if (!order) {
    return next(new ErrorHandler("Order Not Found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get logged in user orders / my order
exports.myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await orderModel.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// get all orders --- Admin
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await orderModel.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// update order status --- Admin
exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await orderModel.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  if (!order.orderStatus) {
    return next(new ErrorHandler("You hava already delivered this order", 400));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await productModel.findById(id);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

// delete order --- Admin
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await orderModel.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});
