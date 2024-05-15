"use client";

//external imports
import { Grid, Paper } from "@mui/material";
import { useState } from "react";

//internal imports
import CustomFileInput from "./components/CustomFileInput";
import CustomTable from "./components/CustomTable";

export default function Home() {
  const [data, setData] = useState([]);

  function fileHandling(event) {}

  return (
    <Grid
      container
      sx={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        minHeight: "100vh",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginBottom: 3,
        }}
      >
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 100,
            background: "white",
            padding: 4,
            width: "20%",
          }}
        >
          <CustomFileInput title={"Insert File"} onClick={fileHandling}>
            File
          </CustomFileInput>
        </Paper>
      </Grid>

      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "80%",
          }}
        >
          {data.length !== 1 && <CustomTable data={data} />}
        </Paper>
      </Grid>
    </Grid>
  );
}
