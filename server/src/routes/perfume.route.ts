import express from "express";
import * as perfumeController from "../controllers/perfume.controller";
import { verifyToken, isAdmin } from "../middleware/auth.middleware";
import * as perfumeValidate from "../validates/perfume.validate";

const router = express.Router();

// Start public routes
router.get("/", perfumeController.getAll);
router.get("/:id", perfumeController.getById);
// End public routes

// Start admin routes
router.post(
  "/",
  verifyToken,
  isAdmin,
  perfumeValidate.createValidate,
  perfumeController.create,
);
router.put(
  "/:id",
  verifyToken,
  isAdmin,
  perfumeValidate.updateValidate,
  perfumeController.update,
);
router.delete("/:id", verifyToken, isAdmin, perfumeController.remove);
// End admin routes

export default router;
