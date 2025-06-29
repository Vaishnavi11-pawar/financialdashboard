export interface Transaction {
  id: number;
  date: string;
  amount: number;
  category: string;
  status: string;
  user_id: string;
  user_profile: string;
}

export interface AnalyticsSummary {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  paidTransactions: number;
  pendingTransactions: number;
}