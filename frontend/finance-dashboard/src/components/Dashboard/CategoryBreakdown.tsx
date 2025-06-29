import { Card, CardContent, Typography, Box } from "@mui/material";

interface Props {
  categories: { Revenue: number; Expense: number };
}

const CategoryBreakdown: React.FC<Props> = ({ categories }) => (
  <Card sx={{ mb: 2 }}>
    <CardContent>
      <Typography variant="subtitle1" fontWeight={700} gutterBottom>
        Category Breakdown
      </Typography>
      <Box mt={2}>
        <Typography color="primary" fontWeight={600} fontSize={16}>
          Revenue
        </Typography>
        <Typography fontWeight={500} fontSize={16} mb={2}>
          ${categories.Revenue}
        </Typography>
        <Typography color="error" fontWeight={600} fontSize={16}>
          Expense
        </Typography>
        <Typography fontWeight={500} fontSize={16}>
          ${categories.Expense}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default CategoryBreakdown;