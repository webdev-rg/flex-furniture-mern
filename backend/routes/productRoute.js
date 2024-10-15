const express = require("express");
const multer = require("multer");
const {
  addProduct,
  getAllProducts,
  getProductImage,
  deleteProduct,
  getProductByCategory,
  searchProduct,
} = require("../controllers/productController");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/addproduct", upload.array("images", 4), addProduct);
router.get("/getproducts", getAllProducts);
router.get("/getproduct/:productname", getProductImage);
router.delete("/deleteproduct/:productId", deleteProduct);
router.get("/productbycategory/:categoryname", getProductByCategory);
router.post("/searchproduct", searchProduct);

module.exports = router;
