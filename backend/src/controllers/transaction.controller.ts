import { Request, Response } from "express";
import path from "path";
import fs from "fs";

// Adjust the path if your data file is elsewhere
const transactionsPath = path.join(__dirname, "../data/transactions.json");

function getTransactions() {
  const data = fs.readFileSync(transactionsPath, "utf-8");
  return JSON.parse(data);
}

export const listTransactions = (req: Request, res: Response) => {
  let transactions = getTransactions();

  // Filters
  const {
    search,
    category,
    status,
    user_id,
    startDate,
    endDate,
    sortBy = "date",
    sortOrder = "desc",
    page = "1",
    limit = "10",
  } = req.query;

  // Search (by user_id or user_profile or category or status or date)
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

  // Filter by category
  if (category && typeof category === "string") {
    transactions = transactions.filter((t: any) => t.category === category);
  }

  // Filter by status
  if (status && typeof status === "string") {
    transactions = transactions.filter((t: any) => t.status === status);
  }

  // Filter by user_id
  if (user_id && typeof user_id === "string") {
    transactions = transactions.filter((t: any) => t.user_id === user_id);
  }

  // Filter by date range
  if (startDate && typeof startDate === "string") {
    transactions = transactions.filter((t: any) => new Date(t.date) >= new Date(startDate));
  }
  if (endDate && typeof endDate === "string") {
    transactions = transactions.filter((t: any) => new Date(t.date) <= new Date(endDate));
  }

  // Sort
  transactions.sort((a: any, b: any) => {
    let fieldA = a[sortBy as string];
    let fieldB = b[sortBy as string];

    // If sorting by amount, ensure numbers
    if (sortBy === "amount") {
      fieldA = Number(fieldA);
      fieldB = Number(fieldB);
    }
    // If sorting by date, convert to Date
    if (sortBy === "date") {
      fieldA = new Date(fieldA);
      fieldB = new Date(fieldB);
    }

    if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination
  const pageNum = parseInt(page as string, 10) || 1;
  const limitNum = parseInt(limit as string, 10) || 10;
  const total = transactions.length;
  const start = (pageNum - 1) * limitNum;
  const end = start + limitNum;
  const paginated = transactions.slice(start, end);

  res.json({
    total,
    page: pageNum,
    limit: limitNum,
    transactions: paginated,
  });
};