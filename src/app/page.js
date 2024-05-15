"use client";

import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import axios from "axios";
import CustomFileInput from "./components/CustomFileInput";
import CustomTable from "./components/CustomTable";
import { Button } from "@mui/material";

export default function Home() {
  const [data, setData] = useState([]);
  const [file, setFile] = useState();

  function fileHandling(event) {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    console.log("Selected File:", selectedFile.name);
    console.log("File Type:", selectedFile.type);
    console.log("File Size:", selectedFile.size);
  }

  async function uploadFile() {
    const formData = new FormData();
    formData.append("csvFile", file);

    try {
      const response = await axios.post(
        "http://localhost:3030/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setData(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

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
            borderRadius: 2,
            // background: "white",
            padding: 4,
            width: "30%",
            flexDirection: "column",
          }}
        >
          <CustomFileInput title={"Insert File"} onChange={fileHandling}>
            File
          </CustomFileInput>
          <Button onClick={uploadFile}>Upload</Button>
          {file && <Grid>Selected File: {file.name}</Grid>}
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
          {data.length > 0 && <CustomTable data={data} />}
        </Paper>
      </Grid>
    </Grid>
  );
}
