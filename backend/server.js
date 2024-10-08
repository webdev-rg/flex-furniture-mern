const express = require("express");
const cors = require("cors");
const multer = require("multer");
const sharp = require("sharp");
require("./config");
const adminModel = require("./models/adminModel");
const categoryModel = require("./models/categoryModel");
const userModel = require("./models/userModel");

const { sendVerificationToken, generateToken } = require("./sendEmail");

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
      return res.status(400).send({ message: "Email already exists" });
    }

    const data = await adminModel({
      firstName: adminData.firstName,
      lastName: adminData.lastName,
      email: adminData.email,
      password: adminData.password,
    });

    await data.save();
    res.status(200).send({ message: "Admin Registration Successfully" });
  } catch (error) {
    console.error("Admin registration failed...:", error);
    res.status(500).send({ message: "Admin registration failed..." });
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
      return res.status(401).send({ message: "Incorrect password" });
    }
    // console.log(adminData);
    res.status(200).send({
      message: "Login Successful",
      admin: adminData,
    });
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

//? Category API
//* Add Category
app.post(
  "/api/addcategory",
  upload.single("categoryImage"),
  async (req, res) => {
    const { name } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const compressedImage = await sharp(req.file.buffer)
      .resize({ width: 300 })
      .png({ quanlity: 80, compressionLevel: 8 })
      .toBuffer();
    const category = await categoryModel({
      name: name,
      image: compressedImage,
      contentType: req.file.mimetype,
    });
    try {
      await category.save();
      res.status(200).send({ message: "Category Created Successfully" });
      console.log(category);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Category creation failed.." });
    }
  }
);

//* Get Categories
app.get("/api/getcategories", async (req, res) => {
  try {
    const categories = await categoryModel.find({}, { image: 0 });
    if (!categories) {
      return res.status(404).send({ message: "No category found" });
    }
    res.status(200).send(categories);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

app.get("/api/getcategoryimage/:id", async (req, res) => {
  try {
    const categoryImage = await categoryModel.findById(req.params.id);
    if (!categoryImage) {
      return res.status(404).send({ message: "No image found" });
    }
    const base64Image = Buffer.from(categoryImage.image).toString("base64");
    const imageDataUrl = `data:${categoryImage.contentType};base64,${base64Image}`;

    res.status(200).json({ imageDataUrl });
  } catch (error) {
    res.status(500).send("Error fetching image");
    console.error(error);
  }
});

app.delete("/api/deletecategory/:id", async (req, res) => {
  try {
    const findCategory = await categoryModel.findOne({
      _id: req.params.id,
    });

    if (!findCategory) {
      return res.status(404).send({ message: "Category not found" });
    }

    const deleteCategory = await categoryModel.deleteOne(findCategory);

    if (deleteCategory) {
      return res.status(200).send({ message: "Category deleted successfully" });
    }
  } catch (error) {
    res.status(500).send({ message: "Category deletion failed" });
    console.log(error);
  }
});

//? Users API
//* Signup User

app.post("/api/usersignup", async (req, res) => {
  console.log(req.body);
  const { user } = req.body;

  try {
    const existingUser = await userModel.findOne({ email: user.email });

    if (!existingUser) {
      const token = generateToken();
      const tokenExpirationTime = new Date(Date.now() + 5 * 60 * 1000);
      console.log(tokenExpirationTime);

      const data = userModel({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: 0,
        address: "",
        token: token,
        tokenExpiration: tokenExpirationTime,
      });

      await data.save();
      await sendVerificationToken(user.email, token);
      res.status(200).send({
        message: "Verification token has sent to your email",
        userData: data,
      });
    } else {
      return res.status(400).send({ message: "Email already exists" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Registration failed..." });
  }
});

//* Signin User

app.post("/api/usersignin", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    } else if (!user.isVerified) {
      return res.status(404).send({ message: "Your account is not verified" });
    }

    const token = generateToken();
    const tokenExpirationTime = new Date(Date.now() + 5 * 60 * 1000);

    user.token = token;
    user.tokenExpiration = tokenExpirationTime;

    try {
      await user.save();
      console.log("User saved succefully");
    } catch (error) {
      console.error(error);
    }

    await sendVerificationToken(email, token);
    res.status(200).send({ message: "Signin Successful", userData: user });
  } catch (error) {}
});

app.post("/api/verify", async (req, res) => {
  const { verificationToken, email } = req.body;

  try {
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user.token !== verificationToken) {
      return res.status(400).send({ message: "Incorrect verification token" });
    }

    if (user.tokenExpiration < Date.now()) {
      console.log("Verification token expires", new Date().toTimeString());
      return res.status(400).send({ message: "Verification token expires" });
    }

    user.isVerified = true;
    user.token = null;
    user.tokenExpiration = null;
    await user.save();

    return res.status(200).send({ message: "Verification Successfull" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Verification failed" });
  }
});

app.post("/api/userdetails", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // console.log(user);
    return res.status(200).send({ message: "User found", userDetails: user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error fetching user data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
