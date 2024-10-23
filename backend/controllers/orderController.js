const OrderModel = require("../models/orderModel");
const CartModel = require("../models/cartModel");

const createOrder = async (req, res) => {
  try {
    const orders = req.body.orders;

    for (const order of orders) {
      const existingOrder = await OrderModel.find({
        productName: order.productName,
        userId: order.userId,
      });

      if (existingOrder) {
        return res
          .status(400)
          .send({
            message: "You have already ordered this product",
            name: order.productName,
          });
      }
    }

    const savedOrders = [];
    for (const order of orders) {
      const totalPrice = order.productPrice * order.productQuantity;

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

      const savedOrder = await newOrder.save();
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
