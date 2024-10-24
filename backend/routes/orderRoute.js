const express = require("express");
const multer = require("multer");
const {
  createOrder,
  getUserOrders,
  getAllOrders,
} = require("../controllers/orderController");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/placeorder", upload.none(), createOrder);
router.get("/getuserorder/:userId", getUserOrders);
router.get("/getallorders", getAllOrders);

module.exports = router;
