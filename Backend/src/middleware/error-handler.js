import { StatusCodes } from "http-status-codes";

const errorHandler = (err, req, res, next) => {

  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong",
  };
  if (err.name === "ValidationError") {
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  if (err.name === "CastError") {
    customError.message = `No item with this id : ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }
  if (err.code && err.code === 11000) {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.message = `${Object.keys(err.keyValue)} already exists`;
  }

  res.status(customError.statusCode).json({ msg: customError.message });
};

export default errorHandler;
