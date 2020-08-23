import express from "express";

import {
  create,
  login,
  forgetPassword,
  updatePassword,
  resetPassword,
} from "../controllers/admin";

import { validate } from "../middlewares/validate";

import {
  loginValidation,
  forgetPasswordValidation,
} from "../validations/admin";

const router = express.Router();

router.post("/create/p", create);

router.post("/login/p", validate(loginValidation), login);

router.post(
  "/forget-password/p",
  validate(forgetPasswordValidation),
  forgetPassword
);

router.get("/update-password/:token/p", updatePassword);

router.post("/reset-password/p", resetPassword);

export { router as AdminRouter };
