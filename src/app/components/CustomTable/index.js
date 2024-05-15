import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function CustomTable({ data }) {
  // Limit the number of rows to 2000
  const limitedData = data.slice(0, 2000);
  return (
    <TableContainer
      component={Paper}
      style={{ maxHeight: "60vh", maxWidth: "80vw" }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {Object.keys(limitedData[0]).map((key) => (
              <TableCell sx={{ fontSize: 10 }} key={key}>
                {key}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {limitedData.map((row, index) => (
            <TableRow key={index}>
              {Object.values(row).map((value, index) => (
                <TableCell sx={{ fontSize: 10 }} key={index}>
                  {value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
