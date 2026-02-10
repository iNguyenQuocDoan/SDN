import express from "express";
import * as authController from "../controllers/authController";
import * as authValidate from "../validates/authValidate";

const router = express.Router();

router.post(
  "/register",
  authValidate.registerValidate,
  authController.register,
);

// prettier-ignore
router.post(
    "/login",
    authValidate.loginValidate,
    authController.login,
);

export default router;
