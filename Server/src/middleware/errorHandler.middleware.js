import { ApiError } from "../utils/ApiErrors.js";

export const errorHandler = async (error, req, res, next) => {
  if (error instanceof ApiError) {
    return res.status(error.status || 500).json({
      statusCode: error.status || 500,
      status: "error",
      message: error.message || "Something went wrong",
      data: null,
    });
  }

  return res.status(500).json({
    statusCode: 500,
    status: "error",
    message: error.message,
    data: null,
  });
};
