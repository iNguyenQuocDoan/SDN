import express, { Request, Response } from "express";
import * as authController from "../controllers/authController";
import * as authValidate from "../validates/authValidate";

const router = express.Router();

router.post(
  "/register",
  authValidate.registerValidate,
  authController.register,
);
// router.post("/login");

export default router;
