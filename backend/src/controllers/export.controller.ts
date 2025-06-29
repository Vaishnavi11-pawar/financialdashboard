import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { Parser } from "json2csv";

const transactionsPath = path.join(__dirname, "../data/transactions.json");

function getTransactions() {
  const data = fs.readFileSync(transactionsPath, "utf-8");
  return JSON.parse(data);
}

export const exportTransactions = (req: Request, res: Response) => {
  let transactions = getTransactions();

  // Filters from body (can also support query if needed)
  const {
    search,
    category,
    status,
    user_id,
    startDate,
    endDate,
    columns = [],
  } = req.body;

  // Filtering logic (same as your listTransactions)
  if (search && typeof search === "string") {
    const s = search.toLowerCase();
    transactions = transactions.filter(
      (t: any) =>
        t.category.toLowerCase().includes(s) ||
        t.status.toLowerCase().includes(s) ||
        t.user_id.toLowerCase().includes(s) ||
        t.user_profile.toLowerCase().includes(s) ||
        t.date.toLowerCase().includes(s)
    );
  }
  if (category && typeof category === "string") {
    transactions = transactions.filter((t: any) => t.category === category);
  }
  if (status && typeof status === "string") {
    transactions = transactions.filter((t: any) => t.status === status);
  }
  if (user_id && typeof user_id === "string") {
    transactions = transactions.filter((t: any) => t.user_id === user_id);
  }
  if (startDate && typeof startDate === "string") {
    transactions = transactions.filter((t: any) => new Date(t.date) >= new Date(startDate));
  }
  if (endDate && typeof endDate === "string") {
    transactions = transactions.filter((t: any) => new Date(t.date) <= new Date(endDate));
  }

  // Select columns
  let exportData = transactions;
  if (Array.isArray(columns) && columns.length > 0) {
    exportData = transactions.map((t: any) => {
      const obj: any = {};
      columns.forEach((col: string) => {
        obj[col] = t[col];
      });
      return obj;
    });
  }

  // Convert to CSV
  const parser = new Parser({ fields: columns.length > 0 ? columns : undefined });
  const csv = parser.parse(exportData);

  // Set headers for download
  res.header("Content-Type", "text/csv");
  res.attachment("transactions_export.csv");
  res.send(csv);
};