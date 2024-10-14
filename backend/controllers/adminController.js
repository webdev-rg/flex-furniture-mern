const AdminModel = require("../models/adminModel");

const adminSignUp = async (req, res) => {
  console.log("Incoming data:", req.body);
  const { adminData } = req.body;

  try {
    const existingAdmin = await AdminModel.findOne({ email: adminData.email });
    if (existingAdmin) {
      return res.status(400).send({ message: "Email already exists" });
    }

    const data = await AdminModel({
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
};

const adminSignIn = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    const adminData = await AdminModel.findOne({ email: email });
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
};

module.exports = { adminSignUp, adminSignIn };
