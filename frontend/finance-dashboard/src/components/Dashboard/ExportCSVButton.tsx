import { Button } from "@mui/material";
import { exportCSV } from "../../api/transactions";

interface Props {
  filters: any;
  columns: string[];
}

const ExportCSVButton: React.FC<Props> = ({ filters, columns }) => {
  const handleExport = async () => {
    const res = await exportCSV({ ...filters, columns });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "transactions_export.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <Button variant="outlined" color="primary" onClick={handleExport}>
      Export CSV
    </Button>
  );
};

export default ExportCSVButton;