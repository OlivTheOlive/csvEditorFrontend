import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridRenderCellParams,
  GridRowModel,
} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// Define the type for the data prop
interface CustomTableProps {
  data: Record<string, any>[];
  onUpdatedData: (updatedData: Record<string, any>[]) => void;
}

/**
 * Renders a table using Material-UI DataGrid with cell editing, row deletion, and new entry capabilities.
 * Displays data passed as a prop in a tabular format. If no data is provided,
 * it shows a message indicating no data is available.
 *
 * @param {CustomTableProps} props - The data object containing an array of objects where each object represents a row in the table.
 * @returns {JSX.Element} A Material-UI DataGrid component with the provided data or a message if no data is available.
 */
export default function CustomTable({
  data,
  onUpdatedData,
}: CustomTableProps): JSX.Element {
  const [rows, setRows] = React.useState<GridRowsProp>(() =>
    data.map((row, index) => ({
      id: index, // Add an id for each row, required by DataGrid
      ...row,
    }))
  );

  React.useEffect(() => {
    // Update rows when external data prop changes
    setRows(data.map((row, index) => ({ id: index + 1, ...row })));
  }, [data]);

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
    headerName: "Delete",
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

  // Handle row updates
  const processRowUpdate = (newRow: GridRowModel, oldRow: GridRowModel) => {
    const updatedRows = rows.map((row) =>
      row.id === oldRow.id ? newRow : row
    );
    setRows(updatedRows);
    onUpdatedData(updatedRows); // Send updated data back to the parent component
    return newRow;
  };

  // Handle delete row
  const handleDelete = (id: number) => {
    const updatedRows = rows.filter((row) => row.id !== id);

    setRows(updatedRows.map((row, index) => ({ ...row, id: index })));

    // Prepare updated data after deleting row
    const updatedData = updatedRows.map((row, index) => ({
      ...row,
      id: index + 1, // Update ids after deletion
    }));

    onUpdatedData(updatedData); // Send updated data back to the parent component
  };

  // Handle adding a new row
  const handleAddRow = () => {
    const newId = rows.length; // Generate new id for the new row
    const emptyRow = Object.fromEntries(
      headers.map((header) => [header, ""])
    ) as Record<string, any>; // Create an empty row object

    const newRows = [{ id: newId, ...emptyRow }, ...rows];
    const updatedRows = newRows.map((row, index) => ({
      ...row,
      id: index + 1,
    }));
    setRows(updatedRows);
    onUpdatedData(updatedRows); // Send updated data back to the parent component
  };

  return (
    <Paper style={{ height: "65vh", width: "90vw" }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircleOutlineIcon />}
        onClick={handleAddRow}
        style={{ width: "100%", height: "5%" }}
      >
        Add New Entry
      </Button>
      <DataGrid
        style={{ width: "100%", height: "95%" }}
        rows={rows}
        columns={columns}
        processRowUpdate={processRowUpdate}
      />
    </Paper>
  );
}
