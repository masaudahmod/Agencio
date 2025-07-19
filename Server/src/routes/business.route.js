import express from "express";
import { auth } from "../middleware/auth.middleware.js";
import { createBusiness, getAllBusinesses } from "../controller/business.controller.js";

const router = express.Router();

router
  .route("/business")
  .get(auth, getAllBusinesses)
  .post(auth, createBusiness);

export default router;
