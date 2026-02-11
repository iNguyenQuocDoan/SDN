import express from "express";
import * as memberController from "../controllers/member.controller";
import * as memberValidate from "../validates/member.validate";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", verifyToken, memberController.getProfile);

router.put(
  "/profile",
  verifyToken,
  memberValidate.updateProfileValidate,
  memberController.updateProfile,
);

router.put(
  "/change-password",
  verifyToken,
  memberValidate.changePasswordValidate,
  memberController.changePassword,
);

export default router;
