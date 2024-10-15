const CategoryModel = require("../models/categoryModel");
const ProductModel = require("../models/productModel");
const sharp = require("sharp");

const addProduct = async (req, res) => {
  try {
    const { name, description, price, discount, rating, stock, category } =
      req.body;

    const imageBuffers = await Promise.all(
      req.files.map(async (file) => {
        const compressedImage = await sharp(file.buffer)
          .resize(500) // Resize image to a width of 500px (you can adjust this)
          .jpeg({ quality: 70 }) // Compress to JPEG format with 70% quality
          .toBuffer();
        return compressedImage;
      })
    );

    const product = new ProductModel({
      name,
      description,
      images: imageBuffers,
      price,
      discount,
      rating,
      stock,
      category,
    });

    await product.save();

    await CategoryModel.findOneAndUpdate(
      { name: category },
      { $inc: { productCount: 1 } },
      { new: true }
    );

    res
      .status(201)
      .send({ message: "Product added successfully", product: product });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to add product" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({});

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

    res
      .status(200)
      .send({ message: "Products", productData: productsWithImages });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to fetch products" });
  }
};

const getProductImage = async (req, res) => {
  try {
    const product = await ProductModel.findOne({
      name: req.params.productname,
    });

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    const productWithImages = product.images.map((imageBuffer) => {
      return `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;
    });

    res.status(200).send({
      message: "Product found",
      productData: product,
      productImages: productWithImages,
    });
  } catch (error) {
    console.error(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.findOne({ _id: req.params.productId });

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    const deleteProduct = await ProductModel.deleteOne(product);
    if (deleteProduct.modifiedCount > 0) {
      return res
        .status(200)
        .send({ message: "Product deleted successfully", deleteProduct });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error deleting product" });
  }
};

module.exports = { addProduct, getAllProducts, getProductImage, deleteProduct };
