const mongoose = require("mongoose");

module.exports = dbConnection = mongoose
  .connect(
    "mongodb+srv://flexfurniture:rVH33mBv5kSLx05s@flex-furniture.ugzqk.mongodb.net/flex-furniture"
  )
  .then(() => console.log("Database Connected Successfully..."))
  .catch((error) => console.error(error));
