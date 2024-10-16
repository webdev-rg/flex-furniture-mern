const CartModel = require("../models/cartModel");

const addToCart = async (req, res) => {
  const {
    productName,
    productPrice,
    productQuantity,
    productImage,
    userAddress,
    userId,
  } = req.body;

  const price = parseFloat(productPrice);
  const quantity = parseInt(productQuantity);

  let totalPrice = 0;

  for (let i = 0; i < quantity; i++) {
    totalPrice += price;
  }

  try {
    const product = new CartModel({
      productName: productName,
      productPrice: price,
      productQuantity: quantity,
      productImage: productImage,
      totalPrice: totalPrice,
      userAddress: userAddress ? userAddress : "No Address",
      userId: userId,
    });

    await product.save();
    console.log("Product Saved...");

    res
      .status(200)
      .send({ message: "Product added to your cart", productData: product });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong please try again" });
  }
};

const getCartItems = async (req, res) => {
  try {
    const cart = await CartModel.find({ userId: req.params.userId });

    if (!cart || cart.length === 0) {
      return res.status(404).send({ message: "Cart details not found" });
    }

    res.status(200).send({ message: "Cart details", cartData: cart });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const cartItem = await CartModel.findOne({ _id: req.params.cartId });
    if (!cartItem) {
      return res.status(404).send({ message: "Cart item not found" });
    }

    const deleteCartItem = await CartModel.deleteOne(cartItem);

    if (deleteCartItem.modifiedCount > 0) {
      res.status(200).send({ message: "One item deleted", cartItem: cartItem });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error deleting cart item" });
  }
};

module.exports = { addToCart, getCartItems, deleteCartItem };
