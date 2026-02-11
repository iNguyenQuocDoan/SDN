import express from "express";
import authRoutes from "./auth.route";
import brandRoutes from "./brand.route";
import perfumeRoutes from "./perfume.route";
import memberRoutes from "./member.route";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/brands", brandRoutes);
router.use("/perfumes", perfumeRoutes);
router.use("/me", memberRoutes);

export default router;
