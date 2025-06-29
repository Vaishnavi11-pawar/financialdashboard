import { Request, Response } from "express";
import path from "path";
import fs from "fs";

const transactionsPath = path.join(__dirname, "../data/transactions.json");

function getTransactions() {
  const data = fs.readFileSync(transactionsPath, "utf-8");
  return JSON.parse(data);
}

export const getSummary = (req: Request, res: Response) => {
  const transactions = getTransactions();
  let totalRevenue = 0, totalExpenses = 0, paidTransactions = 0, pendingTransactions = 0;

  transactions.forEach((t: any) => {
    if (t.category === "Revenue") totalRevenue += t.amount;
    if (t.category === "Expense") totalExpenses += t.amount;
    if (t.status === "Paid") paidTransactions++;
    if (t.status === "Pending") pendingTransactions++;
  });

  res.json({
    totalRevenue,
    totalExpenses,
    netProfit: totalRevenue - totalExpenses,
    paidTransactions,
    pendingTransactions,
  });
};

export const getTrends = (req: Request, res: Response) => {
  const transactions = getTransactions();
  const trends: Record<string, { revenue: number; expense: number }> = {};

  transactions.forEach((t: any) => {
    const month = t.date.slice(0, 7); // "YYYY-MM"
    if (!trends[month]) trends[month] = { revenue: 0, expense: 0 };
    if (t.category === "Revenue") trends[month].revenue += t.amount;
    if (t.category === "Expense") trends[month].expense += t.amount;
  });

  const result = Object.entries(trends).map(([month, data]) => ({
    month,
    ...data,
  }));

  res.json(result);
};

export const getCategories = (req: Request, res: Response) => {
  const transactions = getTransactions();
  let Revenue = 0, Expense = 0;

  transactions.forEach((t: any) => {
    if (t.category === "Revenue") Revenue += t.amount;
    if (t.category === "Expense") Expense += t.amount;
  });

  res.json({ Revenue, Expense });
};