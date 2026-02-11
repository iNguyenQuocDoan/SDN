import express from "express";
import authRoutes from "./auth.route";
import brandRoutes from "./brand.route";
import perfumeRoutes from "./perfume.route";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/brands", brandRoutes);
router.use("/perfumes", perfumeRoutes);

export default router;
