const express = require("express");
const multer = require("multer");
const { addCategory, getCategories, getCategoryImage } = require("../controllers/categoryController");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/addcategory", upload.single("categoryImage"), addCategory);
router.get("/getcategories", getCategories);
router.get("/getcategoryimage/:id", getCategoryImage);

module.exports = router;
