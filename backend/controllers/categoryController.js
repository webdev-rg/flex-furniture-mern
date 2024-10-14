const CategoryModel = require("../models/categoryModel");
const sharp = require("sharp");

const addCategory = async (req, res) => {
  const { name } = req.body;
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const compressedImage = await sharp(req.file.buffer)
    .resize({ width: 300 })
    .png({ quanlity: 80, compressionLevel: 8 })
    .toBuffer();
  const category = await CategoryModel({
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
};

const getCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find({}, { image: 0 });
    if (!categories) {
      return res.status(404).send({ message: "No category found" });
    }
    res.status(200).send(categories);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const getCategoryImage = async (req, res) => {
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
};

const deleteCategory = async (req, res) => {
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
};

module.exports = { addCategory, getCategories, getCategoryImage, deleteCategory };
