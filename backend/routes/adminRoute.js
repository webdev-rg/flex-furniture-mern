const express = require("express");
const { adminSignUp } = require("../controllers/adminController");
const router = express.Router();

router.post("/adminsignup", adminSignUp);

module.exports = router;
