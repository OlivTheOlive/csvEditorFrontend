import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridCellEditStopParams,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// Define the type for the data prop
interface CustomTableProps {
  data: Record<string, any>[];
}

/**
 * Renders a table using Material-UI DataGrid with cell editing and row deletion capabilities.
 * Displays data passed as a prop in a tabular format. If no data is provided,
 * it shows a message indicating no data is available.
 *
 * @param {CustomTableProps} props - The data object containing an array of objects where each object represents a row in the table.
 * @returns {JSX.Element} A Material-UI DataGrid component with the provided data or a message if no data is available.
 */
export default function CustomTable({ data }: CustomTableProps): JSX.Element {
  const [rows, setRows] = React.useState<GridRowsProp>(() =>
    data.map((row, index) => ({
      id: index, // Add an id for each row, required by DataGrid
      ...row,
    }))
  );

  if (data.length === 0) {
    return <div>No data available</div>;
  }

  // Extract headers from the first row of the data
  const headers = Object.keys(data[0]);

  // Create columns array for the DataGrid
  const columns: GridColDef[] = headers.map((header) => ({
    field: header,
    headerName: header.toUpperCase(),
    flex: 1,
    editable: true, // Make cells editable
    type: "string", // Set type to 'date' if it is a date column
  }));

  // Add a delete button column
  columns.push({
    field: "actions",
    headerName: "Actions",
    sortable: false,
    flex: 0.5,
    renderCell: (params: GridRenderCellParams) => (
      <IconButton
        color="secondary"
        onClick={() => handleDelete(params.id as number)}
      >
        <DeleteIcon />
      </IconButton>
    ),
  });

  // Handle cell edit commit
  const handleCellEditCommit = (params: GridCellEditStopParams) => {
    const { id, field, value } = params;
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  // Handle delete row
  const handleDelete = (id: number) => {
    setRows((prevRows) => {
      const newRows = prevRows.filter((row) => row.id !== id);
      return newRows.map((row, index) => ({ ...row, id: index + 1 }));
    });
  };

  return (
    <Paper style={{ height: "65vh", width: "90vw" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        onCellEditStop={handleCellEditCommit}
      />
    </Paper>
  );
}
