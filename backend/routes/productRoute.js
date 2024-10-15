const express = require("express");
const multer = require("multer");
const {
  addProduct,
  getAllProducts,
  getProductImage,
  deleteProduct,
} = require("../controllers/productController");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/addproduct", upload.array("images", 4), addProduct);
router.get("/getproducts", getAllProducts);
router.get("/getproduct/:productname", getProductImage);
router.delete("/deleteproduct/:productId", deleteProduct);

module.exports = router;
