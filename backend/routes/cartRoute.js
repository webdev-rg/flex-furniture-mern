const express = require("express");
const multer = require("multer");
const {
  addToCart,
  getCartItems,
  deleteCartItem,
} = require("../controllers/cartController");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/addtocart", upload.single("productImage"), addToCart);
router.get("/getcartdetails/:userId", getCartItems);
router.delete("/deletecartitem/:cartId", deleteCartItem);

module.exports = router;
