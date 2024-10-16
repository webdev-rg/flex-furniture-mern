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

  const existingProduct = await CartModel.findOne({ productName: productName });

  if (existingProduct) {
    await CartModel.updateOne(
      { productName: productName },
      { $inc: { productQuantity: quantity, totalPrice: totalPrice } },
      { new: true }
    );
    res.status(200).send({ message: "Product added to your cart" });
    return;
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

const updateCart = async (req, res) => {
  const userId = req.params.userId;
  const { cartItems } = req.body;

  try {
    const cartItem = await CartModel.findOne({ userId: userId });

    if (!cartItem) {
      return res.status(404).send({ message: "Cart item not found" });
    }

    cartItems.map(async (item) => {
      await CartModel.updateOne(
        { _id: item.productId },
        {
          $set: {
            productQuantity: item.productQuantity,
            totalPrice: item.totalPrice,
          },
        }
      );
    });
    res.status(200).send({ message: "Your Cart updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error updating cart" });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const cartItem = await CartModel.findOne({ _id: req.params.cartId });
    if (!cartItem) {
      return res.status(404).send({ message: "Cart item not found" });
    }

    const deleteCartItem = await CartModel.deleteOne(cartItem);

    res.status(200).send({ message: "One item deleted", cartItem: cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error deleting cart item" });
  }
};

module.exports = { addToCart, getCartItems, updateCart, deleteCartItem };
