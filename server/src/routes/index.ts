import express from "express";
import authRoutes from "./auth.route";
import brandRoutes from "./brand.route";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/brands", brandRoutes);

export default router;
