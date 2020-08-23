import express from "express";

import {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
} from "../controllers/category";

import { requiresAuth } from "../middlewares/auth";

const router = express.Router();

router.post("/create/p", requiresAuth, create);

router.get("/get-all/p", requiresAuth, getAll);

router.get("/get-by-id/:id/p", requiresAuth, getById);

router.post("/update-by-id/p", requiresAuth, updateById);

router.get("/delete-by-id/:id/p", requiresAuth, deleteById);

export { router as CategoryRouter };
