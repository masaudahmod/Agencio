import express from "express";
import {
  createContent,
  deleteContent,
  getAllContent,
  getContentByDate,
  statusUpdate,
  undoStatusUpdate,
  updateContent,
} from "../controller/content.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/contents").get(auth, getAllContent);
router.route("/content").get(auth, getContentByDate).post(auth, createContent);
router
  .route("/content/:id")
  .put(auth, updateContent)
  .delete(auth, deleteContent);

router.route("/content/status/:id").put(auth, statusUpdate).post(auth, undoStatusUpdate);

export default router;
