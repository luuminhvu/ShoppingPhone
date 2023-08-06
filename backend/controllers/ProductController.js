import Product from "../models/Product.js";
import { products } from "../products.js";
import cloudinary from "../utils/cloudinary.js";
export const getProducts = async (req, res) => {
  res.send(products);
};
export const createProducts = async (req, res) => {
  const { name, brand, desc, price, image } = req.body;
  try {
    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        upload_preset: "ShoppingPhone",
      });
      if (uploadRes) {
        const product = new Product({
          name,
          brand,
          desc,
          price,
          image: uploadRes,
        });
        const savedProduct = await product.save();
        res.status(200).send(savedProduct);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
export const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}; //
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).send(product);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
//delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).send({ message: "Product not found" });
    }
    if (product.image.public_id) {
      const destroyRes = await cloudinary.uploader.destroy(
        product.image.public_id
      );
      if (destroyRes) {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        res.status(200).send(deletedProduct);
      }
    } else {
      console.log("Actions not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
