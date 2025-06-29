import {
  Avatar,
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import type { Transaction } from "../../types";

interface Props {
  transactions: Transaction[];
  total: number;
  page: number;
  limit: number;
  onPageChange: (page: number, limit: number) => void;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const defaultAvatar =
  "https://ui-avatars.com/api/?name=User&background=1976d2&color=fff&size=128";

const TransactionTable: React.FC<Props> = ({
  transactions,
  total,
  page,
  limit,
  onPageChange,
}) => (
  <Paper
    elevation={1}
    sx={{
      borderRadius: 3,
      overflow: "hidden",
      mb: 2,
    }}
  >
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="transaction table">
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
            <TableCell>Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow
              key={tx.id}
              sx={{
                borderBottom: "1px solid #f0f0f0",
                "&:last-child td": { borderBottom: 0 },
              }}
            >
              <TableCell>
                <Box display="flex" alignItems="center" gap={1.5}>
                  <Avatar
                    src={tx.user_profile || defaultAvatar}
                    alt={tx.user_id}
                    sx={{ width: 36, height: 36, fontSize: 14 }}
                  />
                  <Box>
                    <Typography fontWeight={500} fontSize={15}>
                      {tx.user_id}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      User ID
                    </Typography>
                  </Box>
                </Box>
              </TableCell>

              <TableCell>
                <Typography fontSize={14}>{formatDate(tx.date)}</Typography>
              </TableCell>

              <TableCell>
                <Box display="flex" alignItems="center" gap={0.5}>
                  {tx.status === "Paid" ? (
                    <Add fontSize="small" sx={{ color: "#4caf50" }} />
                  ) : (
                    <Remove fontSize="small" sx={{ color: "#ef5350" }} />
                  )}
                  <Typography
                    fontWeight={700}
                    fontSize={16}
                    sx={{
                      fontFamily: "Roboto Mono, monospace",
                      color: tx.status === "Paid" ? "success.main" : "error.main",
                    }}
                  >
                    ${tx.amount}
                  </Typography>
                </Box>
              </TableCell>

              <TableCell>
                <Typography
                  fontSize={14}
                  sx={{ textTransform: "capitalize", color: "text.secondary" }}
                >
                  {tx.category}
                </Typography>
              </TableCell>

              <TableCell>
                <Box
                  sx={{
                    width: 100,
                    textAlign: "center",
                    borderRadius: 2,
                    px: 1.5,
                    py: 0.5,
                    fontWeight: 600,
                    fontSize: 13,
                    color:
                      tx.status === "Paid" ? "success.dark" : "warning.dark",
                    backgroundColor:
                      tx.status === "Paid" ? "#e8f5e9" : "#fff3e0",
                  }}
                >
                  {tx.status}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <TablePagination
      component="div"
      count={total}
      page={page - 1}
      onPageChange={(_, newPage) => onPageChange(newPage + 1, limit)}
      rowsPerPage={limit}
      onRowsPerPageChange={(e) =>
        onPageChange(1, parseInt(e.target.value, 10))
      }
      rowsPerPageOptions={[5, 10, 25, 50]}
      sx={{
        "& .MuiTablePagination-toolbar": {
          px: 2,
        },
      }}
    />
  </Paper>
);

export default TransactionTable;
