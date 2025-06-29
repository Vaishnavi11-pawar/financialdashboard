import  { useEffect, useState } from "react";
import Sidebar from "../components/Layout/Sidebar";
import Navbar from "../components/Layout/Navbar";
import TransactionTable from "../components/Dashboard/TransactionTable";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { fetchTransactions } from "../api/transactions";
import type { Transaction } from "../types";

// const drawerWidth = 220;

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    fetchTransactions({ page, limit }).then(res => {
      setTransactions(res.data.transactions);
      setTotal(res.data.total);
    });
  }, [page, limit]);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Navbar />
        <Box sx={{ pt: 10, px: 0, background: "#fafbfc", minHeight: "100vh" }}>
          <Container maxWidth="lg">
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

export default TransactionsPage;