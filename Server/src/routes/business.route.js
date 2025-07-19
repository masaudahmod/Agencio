import express from "express";
import { auth } from "../middleware/auth.middleware.js";
import {
  createBusiness,
  deleteBusiness,
  getAllBusinesses,
  getBusinessById,
  updateBusiness,
} from "../controller/business.controller.js";

const router = express.Router();

router
  .route("/business")
  .get(auth, getAllBusinesses)
  .post(auth, createBusiness);

router
  .route("/business/:id")
  .get(auth, getBusinessById)
  .delete(auth, deleteBusiness)
  .put(auth, updateBusiness);

export default router;
