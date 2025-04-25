import express from "express";
import {
  userLogin,
  userRegister,
  adminLogin,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.route("/register").post(userRegister); //userRouter.post('/login',userRegister)
userRouter.route("/login").post(userLogin);
userRouter.route("/admin").post(adminLogin);

export default userRouter;
