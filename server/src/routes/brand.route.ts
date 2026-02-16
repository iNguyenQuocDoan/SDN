import express from "express";
import * as brandController from "../controllers/brand.controller";
import { verifyToken, isAdmin } from "../middleware/auth.middleware";
import * as brandValidate from "../validates/brand.validate";

const router = express.Router();

// Start public routes
router.get("/", brandController.getAll);
router.get("/:id", brandController.getById);
// End public routes

// Start admin routes
router.post(
  "/",
  verifyToken,
  isAdmin,
  brandValidate.createValidate,
  brandController.create,
);
router.put(
  "/:id",
  verifyToken,
  isAdmin,
  brandValidate.updateValidate,
  brandController.update,
);
router.delete("/:id", verifyToken, isAdmin, brandController.remove);
// End admin routers

export default router;
