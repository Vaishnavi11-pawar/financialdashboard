import { Box, TextField, MenuItem, Button } from "@mui/material";
import React, { useState } from "react";

interface Props {
  onFilter: (filters: any) => void;
}

const Filters: React.FC<Props> = ({ onFilter }) => {
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({ category, status, search });
  };

  return (
    <Box component="form" display="flex" gap={2} mb={2} onSubmit={handleSubmit}>
      <TextField
        label="Search"
        value={search}
        onChange={e => setSearch(e.target.value)}
        size="small"
      />
      <TextField
        label="Category"
        select
        value={category}
        onChange={e => setCategory(e.target.value)}
        size="small"
        sx={{ minWidth: 120 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Revenue">Revenue</MenuItem>
        <MenuItem value="Expense">Expense</MenuItem>
      </TextField>
      <TextField
        label="Status"
        select
        value={status}
        onChange={e => setStatus(e.target.value)}
        size="small"
        sx={{ minWidth: 120 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Paid">Paid</MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
      </TextField>
      <Button type="submit" variant="contained" color="primary">Filter</Button>
    </Box>
  );
};

export default Filters;