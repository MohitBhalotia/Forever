import { StatusCodes } from "http-status-codes";
import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
import NotFoundError from "../errors/not-found.js";

// Add product
const addProduct = async (req, res) => {
  const { name, description, price, category, subCategory, sizes, bestseller } =
    req.body;
  const image1 = req.files.image1 && req.files.image1[0];
  const image2 = req.files.image2 && req.files.image2[0];
  const image3 = req.files.image3 && req.files.image3[0];
  const image4 = req.files.image4 && req.files.image4[0];

  const images = [image1, image2, image3, image4].filter(
    (item) => item !== undefined
  );

  let imagesUrl = await Promise.all(
    images.map(async (item) => {
      let result = await cloudinary.uploader.upload(item.path, {
        resource_type: "image",
      });
      return result.secure_url;
    })
  );

  const productData = {
    name,
    description,
    price: Number(price),
    category,
    subCategory,
    sizes: JSON.parse(sizes),
    bestseller: bestseller === "true" ? true : false,
    image: imagesUrl,
  };
  await productModel.create(productData);
  res.status(StatusCodes.CREATED).json({ msg: "Product added" });
};

// get All products
const listProducts = async (req, res) => {
  const products = await productModel.find({});
  res.status(StatusCodes.OK).json(products);
};

// remove Product
const removeProduct = async (req, res) => {
  const product = await productModel.findByIdAndDelete(req.params.id);
  if (!product) {
    throw new NotFoundError(`No product with this id ${req.body?.id}`);
  }
  res.status(StatusCodes.OK).json({ msg: "Product removed" });
};

// get Single Product
const singleProduct = async (req, res) => {
  const product = await productModel.findById(req.body.id);
  if (!product) {
    throw new NotFoundError(`No product with this id : ${req.body.id}`);
  }
  res.status(StatusCodes.OK).json(product);
};

export { listProducts, addProduct, removeProduct, singleProduct };
