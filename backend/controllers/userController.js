const UserModel = require("../models/userModel");
const CartModel = require("../models/cartModel");
const sharp = require("sharp");
const { sendVerificationToken, generateToken } = require("../sendEmail");

const userSignUp = async (req, res) => {
  console.log(req.body);
  const { user } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email: user.email });

    if (!existingUser) {
      const token = generateToken();
      const tokenExpirationTime = new Date(Date.now() + 5 * 60 * 1000);
      console.log(tokenExpirationTime);

      const data = UserModel({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: 0,
        address: "",
        token: token,
        tokenExpiration: tokenExpirationTime,
        image: null,
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
};

const userSignIn = async (req, res) => {
  console.log("SignIn");
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).send({ message: "User not found" });
    if (!user.isVerified)
      return res.status(403).send({ message: "Your account is not verified" });

    const token = generateToken();
    const tokenExpirationTime = new Date(Date.now() + 5 * 60 * 1000);

    user.token = token;
    user.tokenExpiration = tokenExpirationTime;

    try {
      await user.save();
      console.log("User saved successfully");
    } catch (error) {
      console.error("Error saving user:", error);
      return res.status(500).send({ message: "Failed to update user token" });
    }

    try {
      await sendVerificationToken(email, token);
      console.log("Verification Token Sent");
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).send({ message: "Failed to send email" });
    }

    return res
      .status(200)
      .send({ message: "Signin token has sent to your email", userData: user });
  } catch (error) {
    console.error("SignIn Error:", error);
    res.status(500).send({ message: "Error in signin" });
  }
};

const userDetails = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // console.log(user);
    return res.status(200).send({ message: "User found", userDetails: user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error fetching user data" });
  }
};

const updateUser = async (req, res) => {
  const { email, firstName, lastName, phoneNumber, address } = req.body;

  try {
    const user = await UserModel.findOneAndUpdate(
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

    const updatedUser = await UserModel.findOne({ email: email });

    res.status(200).send({
      message: "Details updated successfully",
      updatedUser: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error updating your details" });
  }
};

const updateUserProfileImage = async (req, res) => {
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
    const user = await UserModel.findOneAndUpdate(
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
};

const getUserImage = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else if (user.image == null) {
      return res.status(400).send({ message: "User image has null value" });
    }

    const imageBuffer = user.image; // This should be the buffer stored in the database
    const base64Image = imageBuffer.toString("base64");

    res.status(200).send({
      message: "User image fetched successfully",
      image: `data:${user.contentType};base64,${base64Image}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching user profile image" });
  }
};

const userVerification = async (req, res) => {
  const { verificationToken, email } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });

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
};

const deleteUser = async (req, res) => {
  const { uniqueId } = req.body;
  console.log("UniqueId: ", uniqueId);

  const userId = uniqueId;

  try {
    const user = await UserModel.findOneAndDelete({ _id: userId });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const deleteCartItems = await CartModel.deleteMany({ userId: userId });

    if (user && deleteCartItems) {
      return res
        .status(200)
        .send({ message: "Your account deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to delete" });
  }
};

module.exports = {
  userSignUp,
  userSignIn,
  userDetails,
  updateUser,
  updateUserProfileImage,
  getUserImage,
  userVerification,
  deleteUser,
};
