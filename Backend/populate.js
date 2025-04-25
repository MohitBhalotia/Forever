import productModel from "./src/models/productModel.js";
import connectDB from "./src/config/mongoDB.js";
import "dotenv/config";
const url = process.env.MONGO_URI;
import products from "./products.json" assert { type: "json" };

const main = async () => {
  try {
    await connectDB(url);
    await productModel.deleteMany();
    await productModel.create(products);
    console.log("Data added successfully");

    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

main();
