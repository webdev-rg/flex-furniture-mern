const OrderModel = require("../models/orderModel");
const CartModel = require("../models/cartModel");

const createOrder = async (req, res) => {
  try {
    const orders = req.body.orders;

    for (const order of orders) {
      const existingOrder = await OrderModel.findOne({
        productName: order.productName,
        userId: order.userId,
      });

      if (existingOrder) {
        return res.status(400).send({
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

    console.log(savedOrders);

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

const getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;

    const userOrders = await OrderModel.find({ userId: userId });

    if (!userOrders) {
      return res.status(404).send({ message: "No orders" });
    }

    res.status(200).send({ message: "Orders found", orders: userOrders });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = { createOrder, getUserOrders };
