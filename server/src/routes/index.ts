import express from "express";
import authRoutes from "./authRoute";
import brandRoutes from "./brandRoute";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/brands", brandRoutes);

export default router;
