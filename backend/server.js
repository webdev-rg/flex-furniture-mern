const express = require("express");
const cors = require("cors");
const multer = require("multer");
const sharp = require("sharp");
require("./config");
const adminRoute = require("./routes/adminRoute");
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");
const userModel = require("./models/userModel");
const productModel = require("./models/productModel");
const cartModel = require("./models/cartModel");

const { sendVerificationToken, generateToken } = require("./sendEmail");

const app = express();
const PORT = 1901;

app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage });

//? Admin API
app.use("/api", adminRoute);

//? Category API
app.use("/api", categoryRoute);

//? Products API
app.use("/api", productRoute);

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
    res
      .status(200)
      .send({ message: "Signin token has sent to your email", userData: user });
  } catch (error) {}
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

app.put("/api/updateuser", async (req, res) => {
  const { email, firstName, lastName, phoneNumber, address } = req.body;

  try {
    const user = await userModel.findOneAndUpdate(
      { email: email },
      {
        $set: {
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          address: address,
        },
      }
    );

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ message: "Details updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error updating your details" });
  }
});

app.put(
  "/api/updateprofileimage",
  upload.single("profileImage"),
  async (req, res) => {
    const { email } = req.body;

    try {
      // Check if a file was uploaded
      if (!req.file) {
        return res.status(400).send({ message: "No file uploaded" });
      }

      // Determine if the file is JPEG or PNG
      let compressedImage;
      const fileType = req.file.mimetype;

      if (fileType === "image/jpeg") {
        compressedImage = await sharp(req.file.buffer)
          .resize({ width: 300 })
          .jpeg({ quality: 80 }) // Use jpeg settings
          .toBuffer();
      } else if (fileType === "image/png") {
        compressedImage = await sharp(req.file.buffer)
          .resize({ width: 300 })
          .png({ compressionLevel: 8 }) // Use png settings
          .toBuffer();
      } else {
        return res.status(400).send({ message: "Unsupported file format" });
      }

      // Update the user's profile with the compressed image and its content type
      const user = await userModel.findOneAndUpdate(
        { email: email },
        { $set: { image: compressedImage, contentType: fileType } }
      );

      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      res.status(200).send({ message: "Profile image updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Profile image not uploaded" });
    }
  }
);

app.post("/api/getuserimage", async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });

  if (!user || !user.image) {
    return res.status(404).json({ message: "User or image not found" });
  }

  const imageBuffer = user.image; // This should be the buffer stored in the database
  const base64Image = imageBuffer.toString("base64");
  const mimeType = "image/jpeg"; // Adjust the MIME type as needed, e.g., "image/png"

  res.json({
    message: "User image fetched successfully",
    image: `data:${mimeType};base64,${base64Image}`,
  });
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

app.delete("/api/deleteuser", async (req, res) => {
  const { uniqueId } = req.body;
  console.log("UniqueId: ", uniqueId);

  try {
    const user = await userModel.findOneAndDelete({ _id: uniqueId });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ message: "Your account deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to delete" });
  }
});

//? Add to cart API

app.post("/api/addtocart", upload.single("productImage"), async (req, res) => {
  const {
    productName,
    productPrice,
    productQuantity,
    productImage,
    userAddress,
    userId,
  } = req.body;

  const price = parseFloat(productPrice);
  const quantity = parseInt(productQuantity);

  let totalPrice = 0;

  for (let i = 0; i < quantity; i++) {
    totalPrice += price;
  }

  try {
    const product = new cartModel({
      productName: productName,
      productPrice: price,
      productQuantity: quantity,
      productImage: productImage,
      totalPrice: totalPrice,
      userAddress: userAddress,
      userId: userId,
    });

    await product.save();
    console.log("Product Saved...");

    res
      .status(200)
      .send({ message: "Product added to your cart", productData: product });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong please try again" });
  }
});

app.get("/api/getcartdetails/:userId", async (req, res) => {
  try {
    const cart = await cartModel.find({ userId: req.params.userId });

    if (!cart || cart.length === 0) {
      return res.status(404).send({ message: "Cart details not found" });
    }

    res.status(200).send({ message: "Cart details", cartData: cart });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

app.delete("/api/deletecartitem/:cartId", async (req, res) => {
  try {
    const cartItem = await cartModel.findOne({ _id: req.params.cartId });
    if (!cartItem) {
      return res.status(404).send({ message: "Cart item not found" });
    }

    const deleteCartItem = await cartModel.deleteOne(cartItem);

    res.status(200).send({ message: "One item deleted", cartItem: cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error deleting cart item" });
  }
});

//? Search Product API

app.post("/api/searchproduct", async (req, res) => {
  let { searchTerm } = req.body;

  if (typeof searchTerm !== "string") {
    searchTerm = String(searchTerm);
    searchTerm = searchTerm.trim();
  }

  console.log("Search term:", searchTerm);

  try {
    const searchProduct = await productModel.find({
      name: { $regex: searchTerm, $options: "i" },
    });

    // console.log("Found products:", searchProduct);

    if (!searchProduct || searchProduct.length === 0) {
      return res.status(404).send({ message: "No product found" });
    }

    const productWithImages = searchProduct.map((product) => {
      const images = product.images.map((imageBuffer) => {
        return `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;
      });

      return {
        _id: product._id,
        name: product.name,
        price: product.price,
        discount: product.discount,
        rating: product.rating,
        category: product.category,
        images,
      };
    });

    res
      .status(200)
      .send({ message: "Products found", searchProduct: productWithImages });
  } catch (error) {
    res.status(500).send({ message: "Server error", error });
  }
});

app.get("/api/productbycategory/:categoryname", async (req, res) => {
  try {
    const products = await productModel.find({
      category: req.params.categoryname,
    });

    if (!products) {
      return res.status(404).send({ message: "No products found" });
    }

    const productsWithImages = products.map((product) => {
      const images = product.images.map((imageBuffer) => {
        return `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;
      });

      return {
        _id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        discount: product.discount,
        rating: product.rating,
        stock: product.stock,
        category: product.category,
        images,
      };
    });

    res.status(200).send({ product: productsWithImages });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
