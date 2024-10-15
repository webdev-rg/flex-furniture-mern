const express = require("express");
const {
  userSignUp,
  userSignIn,
  userDetails,
  updateUser,
  updateUserProfileImage,
  getUserImage,
  userVerification,
  deleteUser,
} = require("../controllers/userController");
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/usersignup", userSignUp);
router.post("/usersignin", userSignIn);
router.post("/userdetails", userDetails);
router.put("/updateuser", updateUser);
router.put(
  "/updateprofileimage",
  upload.single("profileImage"),
  updateUserProfileImage
);
router.post("/getuserimage", getUserImage);
router.post("/verify", userVerification);
router.delete("/deleteuser", deleteUser);

module.exports = router;
