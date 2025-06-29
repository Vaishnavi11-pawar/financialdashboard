import express from "express";
import { getSummary, getTrends, getCategories } from "../controllers/analytics.controller";

const router = express.Router();

router.get("/analytics/summary", getSummary);
router.get("/analytics/trends", getTrends);
router.get("/analytics/categories", getCategories);

export default router;