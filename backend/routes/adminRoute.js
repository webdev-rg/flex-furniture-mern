const express = require("express");
const cors = require("cors");
const { adminSignUp } = require("../controllers/adminController");
const app = express();

app.use(cors());

app.post("/api/adminsignup", adminSignUp);
