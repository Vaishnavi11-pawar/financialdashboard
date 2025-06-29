import { Card, CardContent, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { fetchTrends } from "../../api/transactions";

const TrendsChart = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchTrends().then((res) => setData(res.data));
  }, []);

  return (
    <Card sx={{ mb: 2, height: 350, boxShadow: 2 }}>
      <CardContent>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>
          Revenue vs Expense Trends
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid stroke="#e0e0e0" strokeDasharray="2 2" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{ fontSize: 12 }}
              labelStyle={{ fontWeight: 500 }}
              cursor={{ stroke: "#ccc", strokeWidth: 1 }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#1976d2"
              strokeWidth={2}
              name="Revenue"
              dot={false}
              activeDot={false}
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#e53935"
              strokeWidth={2}
              name="Expense"
              dot={false}
              activeDot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TrendsChart;
