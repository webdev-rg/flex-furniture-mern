const express = require("express");
const { adminSignUp, adminSignIn } = require("../controllers/adminController");
const router = express.Router()

router.post("/adminsignup", adminSignUp);
router.post("/adminsignin", adminSignIn);

module.exports = router;
