import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Define the type for the data prop
interface CustomTableProps {
  data: Record<string, any>[];
}

/**
 * Renders a table using Material-UI components with sticky headers.
 * Displays data passed as a prop in a tabular format. If no data is provided,
 * it shows a message indicating no data is available.
 *
 * @param {CustomTableProps} props - The data object containing an array of objects where each object represents a row in the table.
 * @returns {JSX.Element} A Material-UI Table component with the provided data or a message if no data is available.
 */
export default function CustomTable({ data }: CustomTableProps): JSX.Element {
  if (data.length === 0) {
    return <div>No data available</div>;
  }

  // Extract headers from the first row of the data
  const headers = Object.keys(data[0]);

  return (
    <TableContainer
      component={Paper}
      style={{ maxHeight: "65vh", maxWidth: "90vw" }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell sx={{ fontSize: 10 }} key={header}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {headers.map((header, cellIndex) => (
                <TableCell sx={{ fontSize: 10 }} key={cellIndex}>
                  {row[header]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
