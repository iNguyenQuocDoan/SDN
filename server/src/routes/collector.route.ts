import express from "express";
import * as collectorController from "../controllers/collector.controller";
import { verifyToken, isAdmin } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", verifyToken, isAdmin, collectorController.getAll);

export default router;
