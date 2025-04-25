import mongoose from "mongoose";
const connectDB = async (url) => {
  mongoose.connection.on("connected", () => console.log("DB connected..."));
  await mongoose.connect(url);
};

export default connectDB;
