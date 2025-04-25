import jwt from "jsonwebtoken";
import UnauthenticatedError from "../errors/unauthenticated.js";

const adminAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication Failed");
  }
  const token = authHeader.split(" ")[1];

  const payload = jwt.verify(token, process.env.JWT_SECRET);

  if (payload.role !== "Admin") {
    throw new UnauthenticatedError(
      "Authentication Failed: Insufficient permissions"
    );
  }
  req.user = { role: payload.role };
  console.log(req.user);

  next();
};

export default adminAuth;
