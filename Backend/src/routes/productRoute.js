import express from "express";
import {
  listProducts,
  addProduct,
  removeProduct,
  singleProduct,
} from "../controllers/productController.js";
import adminAuth from "../middleware/adminAuth.js";
import upload from "../middleware/multer.js";

const productRouter = express.Router();

productRouter.route("/add-product").post(
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.route("/remove-product/:id").delete(adminAuth, removeProduct);
productRouter.route("/get-all-products").get(listProducts);
productRouter.route("/get-single-product").get(singleProduct);

export default productRouter;
