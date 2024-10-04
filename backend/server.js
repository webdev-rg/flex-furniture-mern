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
//* Admin Signup
app.post("/api/adminsignup", async (req, res) => {
  console.log("Incoming data:", req.body);
  const { adminData } = req.body;

  try {
    const existingAdmin = await adminModel.findOne({ email: adminData.email });
    if (existingAdmin) {
      return res.status(400).send({ message: "Admin already exists" });
    }

    const data = await adminModel({
      firstName: adminData.firstName,
      lastName: adminData.lastName,
      email: adminData.email,
      password: adminData.password,
    });

    await data.save();
    res.status(200).send({ message: "Admin Created Successfully" });
  } catch (error) {
    console.error("Error Creating Admin:", error);
    res.status(500).send({ message: "Error creating admin" });
  }
});

//* Admin Signin
app.post("/api/adminsignin", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    const adminData = await adminModel.findOne({ email: email });
    if (!adminData) {
      return res.status(404).send({ message: "Incorrect Email" });
    }
    if (adminData.password !== password) {
      return res.status(401).send({ message: "Incorrect Password" });
    }
    // console.log(adminData);
    res.status(200).send({
      message: "Login Successful",
      dataa: adminData,
    });
  } catch (error) {
    console.error(error);
    res.status(500);
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
