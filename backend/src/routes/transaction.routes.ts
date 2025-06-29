import express from "express";
import { listTransactions } from "../controllers/transaction.controller";

const router = express.Router();

router.get("/transactions", listTransactions);

export default router;