import express from "express";
import * as perfumeController from "../controllers/perfume.controller";
import * as commentController from "../controllers/comment.controller";
import { verifyToken, isAdmin } from "../middleware/auth.middleware";
import * as perfumeValidate from "../validates/perfume.validate";
import * as commentValidate from "../validates/comment.validate";

const router = express.Router();

// Start public routes
router.get("/", perfumeController.getAll);
router.get("/:id", perfumeController.getById);
// End public routes

// Login required routes
router.post(
  "/:id/comment",
  verifyToken,
  commentValidate.addCommentValidate,
  commentController.addComment,
);
// End login required routes

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
