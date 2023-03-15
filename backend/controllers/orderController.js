const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandlers = require('../utils/errorhandlers');


// Create new Order
exports.newOrder = catchAsyncErrors(async (req,res,next)=>{
  // Desctructuring
  const {
         shippingInfo,
         orderItems,
         paymentInfo,
         itemsPrice,
         taxPrice,
         shippingPrice,
         totalPrice
        } = req.body;

  // Create Order

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt:Date.now(),
    user:req.user._id,
  });

  res.status(201).json({
    success:true,
    order
  })
})


// Get Single Order   
exports.getSingleOrder = catchAsyncErrors(async (req,res,next)=>{
  const order = await Order.findById(req.params.id).populate("user","name email");

  if (!order) {
    return next(new ErrorHandlers("Order not found with this id",404))
  };

  res.status(200).json({
    success:true,
    order
  })
})

// Get logged in user Orders

exports.myOrders = catchAsyncErrors(async (req,res,next)=>{
  const orders = await Order.find({user:req.user._id});

  res.status(200).json({
    success: true,
    orders
  })
});

// Get All Orders   --Admin
exports.getAllOrders = catchAsyncErrors(async (req,res,next)=>{
  const orders = await Order.find();

  // for avg

  let totalamount = 0;

  orders.forEach((order)=>{
    totalamount += order.totalPrice
  })
  res.status(200).json({
    success: true,
    totalamount,
    orders
  })
});
// update Order Status -- Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandlers("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandlers("You have already delivered this order", 400));
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
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// Delete Order  --Admin
exports.deleteOrder = catchAsyncErrors(async (req,res,next)=>{
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandlers("Order not found with this id",404))
  };

  await order.remove();

  res.status(200).json({
    success: true,
  })
})