import { useEffect, useState } from "react";
import Sidebar from "../components/Layout/Sidebar";
import Navbar from "../components/Layout/Navbar";
import TrendsChart from "../components/Dashboard/TrendsChart";
import CategoryBreakdown from "../components/Dashboard/CategoryBreakdown";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { fetchCategories, fetchTrends } from "../api/transactions";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const AnalyticsPage = () => {
  const [categories, setCategories] = useState<{ Revenue: number; Expense: number }>({ Revenue: 0, Expense: 0 });
  const [trends, setTrends] = useState<any[]>([]);

  useEffect(() => {
    fetchCategories().then(res => setCategories(res.data));
    fetchTrends().then(res => setTrends(res.data));
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Navbar />
        <Box sx={{ pt: 10, px: 0, background: "#fafbfc", minHeight: "120vh"}}>
          <Container maxWidth="lg">
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: "#1976d2", mt: 3 }}>
              Monthly Analytics Report
            </Typography>
            <Box display="flex" gap={2} flexWrap="wrap" sx={{ pt: 3 }}>
              <Box flex="3" minWidth="300px">
                <TrendsChart />
              </Box>
              <Box flex="1" minWidth="300px">
                <CategoryBreakdown categories={categories} />
              </Box>
            </Box>
            <TableContainer
              component={Paper}
              sx={{
                mt: 4,
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: 1,
                mb: 4
              }}
            >
              <Table sx={{ minWidth: 650 }} size="small" aria-label="monthly analytics table">
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: "#f9fafb",
                      "& th": {
                        fontWeight: 600,
                        fontSize: 14,
                        color: "#6b7280",
                      },
                    }}
                  >
                    <TableCell>Month</TableCell>
                    <TableCell >Revenue</TableCell>
                    <TableCell >Expense</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {trends.map((row: any) => (
                    <TableRow
                      key={row.month}
                      sx={{
                        borderBottom: "1px solid #f0f0f0",
                        "&:last-child td": { borderBottom: 0 },
                      }}
                    >
                      <TableCell>
                        <Typography fontWeight={500} fontSize={15}>
                          {row.month}
                        </Typography>
                      </TableCell>
                      <TableCell >
                        <Typography
                          fontWeight={700}
                          fontSize={16}
                          sx={{
                            fontFamily: "Roboto Mono, monospace",
                            color: "success.main",
                          }}
                        >
                          ${row.revenue}
                        </Typography>
                      </TableCell>
                      <TableCell >
                        <Typography
                          fontWeight={700}
                          fontSize={16}
                          sx={{
                            fontFamily: "Roboto Mono, monospace",
                            color: "error.main",
                          }}
                        >
                          ${row.expense}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default AnalyticsPage;