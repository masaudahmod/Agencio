import express, { Router } from "express";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/user.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const router = express.Router();


router.route("/users").get(getUser);
router.route("/users/register").post(registerUser);
router.route("/users/login").post(loginUser);
router.route("/users/logout").post(auth, logoutUser);

export default router;
