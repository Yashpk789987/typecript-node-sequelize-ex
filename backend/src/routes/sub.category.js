import express from "express";
import multer from "multer";

import {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
  getAllByCategoryId,
} from "../controllers/sub.category";

import { requiresAuth } from "../middlewares/auth";

const upload = multer({ dest: "public/images/sub-category" });

const router = express.Router();

router.post("/create/p", [requiresAuth, upload.single("logo")], create);

router.get("/get-all/p", requiresAuth, getAll);

router.get(
  "/get-all-by-category-id/:categoryId/p",
  requiresAuth,
  getAllByCategoryId
);

router.get("/get-by-id/:id/p", requiresAuth, getById);

router.post(
  "/update-by-id/p",
  [requiresAuth, upload.single("logo")],
  updateById
);

router.get("/delete-by-id/:id/p", requiresAuth, deleteById);

export const SubCategoryRouter = router;
