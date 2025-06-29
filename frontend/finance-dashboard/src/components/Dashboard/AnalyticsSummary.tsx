// import { Card, CardContent, Typography, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import type {AnalyticsSummary}  from "../../types";
import { Box } from '@mui/material';

interface Props {
  summary: AnalyticsSummary;
}

const AnalyticsSummaryCard: React.FC<Props> = ({ summary }) => (

  <Box
  display="flex"
  flexWrap="wrap"
  gap={2}
  mb={2}
  justifyContent="space-between"
>
  <Box flex="1 1 250px" maxWidth="300px">
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Total Revenue
        </Typography>
        <Typography variant="h6" color="primary">
          ${summary.totalRevenue}
        </Typography>
      </CardContent>
    </Card>
  </Box>

  <Box flex="1 1 250px" maxWidth="300px">
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Total Expenses
        </Typography>
        <Typography variant="h6" color="error">
          ${summary.totalExpenses}
        </Typography>
      </CardContent>
    </Card>
  </Box>

  <Box flex="1 1 250px" maxWidth="300px">
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Net Profit
        </Typography>
        <Typography variant="h6" color="success.main">
          ${summary.netProfit}
        </Typography>
      </CardContent>
    </Card>
  </Box>

  <Box flex="1 1 250px" maxWidth="300px">
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Paid / Pending
        </Typography>
        <Typography variant="h6">
          {summary.paidTransactions} / {summary.pendingTransactions}
        </Typography>
      </CardContent>
    </Card>
  </Box>
</Box>

);

export default AnalyticsSummaryCard;