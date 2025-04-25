import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "E-mail is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: 8,
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT = function () {
  const token = jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
  return token;
};

userSchema.methods.comparePassword = async function (enteredPass) {
  const isMatch = await bcrypt.compare(enteredPass, this.password);
  return isMatch;
};

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
