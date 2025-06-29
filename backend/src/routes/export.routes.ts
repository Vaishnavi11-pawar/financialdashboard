import express from "express";
import { exportTransactions } from "../controllers/export.controller";

const router = express.Router();

router.post("/export", exportTransactions);

export default router;