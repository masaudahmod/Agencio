import jwt from "jsonwebtoken";
import { ApiError } from "./ApiErrors.js";
import { User } from "../model/user.shcema.js";
import { ACCESSTOKEN_SECRET } from "../constant.js";

export const verifyTokenAndGetUser = async (token) => {
  if (!token) {
    throw new ApiError(401, "Unauthorized access - token not found");
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, ACCESSTOKEN_SECRET);
  } catch (error) {
    throw new ApiError(401, "Unauthorized access - invalid token");
  }
  const user = await User.findById(decodedToken._id).populate({
    path: "role",
    populate: { path: "permissions" },
  });
  if (!user) {
    throw new ApiError(404, "Unauthorized access - user not found");
  }
  return user;
};
