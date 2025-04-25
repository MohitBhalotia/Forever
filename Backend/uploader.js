import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import products from "./products.json" assert { type: "json" };
import "dotenv/config";

async function uploadImages() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
  });

  for (const item of products) {
    const uploadedImages = [];

    for (const image of item.image) {
      const path = "D:/E-Commerce/Frontend/src/assets/" + image + ".png";
      if (!fs.existsSync(path)) {
        console.error(`File not found: ${path}`);
        continue; // Skip to the next iteration
      }

      const result = await cloudinary.uploader.upload(path, {
        resource_type: "image",
      });

      uploadedImages.push(result.secure_url);
    }

    item.image = uploadedImages;
  }

  // Write the updated products array back to the products.json file
  fs.writeFileSync(
    "./products.json",
    JSON.stringify(products, null, 2),
    "utf-8"
  );
}

uploadImages()
  .then(() => {
    console.log("All images processed and products.json updated.");
  })
  .catch((error) => {
    console.error("Error in processing images:", error);
  });
