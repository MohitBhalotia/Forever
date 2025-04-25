import jwt from "jsonwebtoken";
import UnauthenticatedError from "../errors/unauthenticated.js";

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication failed");
  }
  const token = authHeader.split(" ")[1];
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  req.user = { userId: payload.userId };
  next();
};

export default userAuth;
