const OrderModel = require("../models/orderModel");
const CartModel = require("../models/cartModel");

const createOrder = async (req, res) => {
  try {
    const orders = req.body.orders; // Extract orders from the request body

    const savedOrders = [];
    for (const order of orders) {
      const totalPrice = order.productPrice * order.productQuantity; // Calculate total price for each order

      const newOrder = new OrderModel({
        productName: order.productName,
        productPrice: order.productPrice,
        productQuantity: order.productQuantity,
        productImage: order.productImage,
        totalPrice,
        userId: order.userId,
        userName: order.userName,
        userAddress: order.userAddress,
      });

      const savedOrder = await newOrder.save(); // Save each order
      savedOrders.push(savedOrder);
    }

    for (const order of orders) {
      const deletePlacedOrders = await CartModel.deleteMany({
        productName: order.productName,
        userId: order.userId,
      });
    }

    res
      .status(200)
      .send({ message: "Your orders have been placed", orders: savedOrders });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Internal server error", error });
  }
};

module.exports = { createOrder };
