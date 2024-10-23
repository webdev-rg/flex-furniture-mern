const express = require("express");
const multer = require("multer");
const { createOrder } = require("../controllers/orderController");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/placeorder", upload.none(), createOrder);

module.exports = router;
