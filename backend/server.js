const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("./config");
const adminModel = require("./models/adminModel");
const categoryModel = require("./models/categoryModel");

const app = express();
const PORT = 1901;

app.use(cors());
app.use(express.json());

//? Admin API
app.post("/api/createadmin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const data = await adminModel({
      adminEmail: email,
      adminPassword: password,
    });

    await data.save();
    res.status(200).json({ message: "Admin Created Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating admin" });
    console.log(error);
  }
});

app.get("/api/getadmin", async (req, res) => {
  try {
    const adminData = await adminModel.find({});
    res.status(200).send(adminData);
  } catch (error) {
    console.error(error);
  }
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

//? Category API
app.post(
  "/api/addcategory",
  upload.single("categoryImage"),
  async (req, res) => {
    console.log(req.file); // This should log the file info
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const category = await categoryModel({
      categoryName: req.body.name,
      categoryImage: req.file.buffer,
      contentType: req.file.mimetype,
    });
    try {
      await category.save();
      res.status(200).json({ message: "Category Created Successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro creating category" });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
