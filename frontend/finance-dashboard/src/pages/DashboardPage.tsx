import { useEffect, useState } from "react";
import Navbar from "../components/Layout/Navbar";
import AnalyticsSummary from "../components/Dashboard/AnalyticsSummary";
import CategoryBreakdown from "../components/Dashboard/CategoryBreakdown";
import TrendsChart from "../components/Dashboard/TrendsChart";
import TransactionTable from "../components/Dashboard/TransactionTable";
import Filters from "../components/Dashboard/Filters";
import ExportCSVButton from "../components/Dashboard/ExportCSVButton";
import { fetchSummary, fetchCategories, fetchTrends, fetchTransactions } from "../api/transactions";
// import { Box, Container, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import type { AnalyticsSummary as AnalyticsSummaryType, Transaction } from "../types";
import Sidebar from "../components/Layout/Sidebar";

const drawerWidth = 0;

const DashboardPage = () => {
  const [summary, setSummary] = useState<AnalyticsSummaryType | null>(null);
  const [categories, setCategories] = useState<{ Revenue: number; Expense: number }>({ Revenue: 0, Expense: 0 });
  const [trends, setTrends] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState<any>({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    fetchSummary().then(res => setSummary(res.data));
    fetchCategories().then(res => setCategories(res.data));
    fetchTrends().then(res => setTrends(res.data));
  }, []);

  useEffect(() => {
    fetchTransactions({ ...filters, page, limit }).then(res => {
      setTransactions(res.data.transactions);
      setTotal(res.data.total);
    });
  }, [filters, page, limit]);

  return (

    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, ml: `${drawerWidth}px` }}>
        <Navbar />
        <Box sx={{ pt: 14, px: 0, background: "#fafbfc", minHeight: "195vh", pb: 4 }}>
          <Container maxWidth="lg">
            {summary && <AnalyticsSummary summary={summary} />}
             <Box display="flex" gap={2} flexWrap="wrap" sx={{pt: 3}}>
                <Box flex="3" minWidth="300px">
                    <TrendsChart />
                </Box>
                <Box flex="1" minWidth="300px">
                    <CategoryBreakdown categories={categories} />
                </Box>
             </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
              <Filters onFilter={setFilters} />
              <ExportCSVButton filters={filters} columns={["date", "amount", "category"]} />
            </Box>
            <TransactionTable
              transactions={transactions}
              total={total}
              page={page}
              limit={limit}
              onPageChange={(p, l) => {
                setPage(p);
                setLimit(l);
              }}
            />
          </Container>
          </Box>
      </Box>
    </Box>

  );
};

export default DashboardPage;