"use client";

// Importing React library and specific hooks from React
import React, { useState, ChangeEvent } from "react";

// Importing Grid component from Material-UI for creating a grid layout
import Grid from "@mui/material/Grid";

// Importing Paper component from Material-UI, used to create paper-like surfaces
import Paper from "@mui/material/Paper";

// Importing axios, a promise-based HTTP client for making requests to APIs
import axios from "axios";

// Importing a custom file input component
import CustomButton from "@/components/CustomButton/index";

// Importing a custom table component
import CustomTable from "@/components/CustomTable/CustomTable";

// Importing several components from Material-UI
import { Backdrop, Button, CircularProgress, Typography } from "@mui/material";

// Importing keyframes utility from Material-UI's system for creating CSS animations
import { keyframes } from "@mui/system";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// Define TypeScript types for state variables
interface Data {
  _data: any[];
}

const dropDownAnimation = keyframes`
  0% {
    transform: translateY(-60%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

/**
 * Manages file uploads and displays data in a table format.
 * Uses hooks for state management and handles file uploads asynchronously using axios.
 *
 * @returns {JSX.Element} React component with file input, upload button, and data table.
 */
export default function Home(): JSX.Element {
  const [data, setData] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  function fileHandling(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile ?? null);
    setError(false);
  }

  async function uploadFile() {
    const formData = new FormData();

    if (file) {
      setError(false);
      setLoading(true);
      formData.append("csvFile", file);
      try {
        const response = await axios.post<Data>(
          "http://localhost:3033/api/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setData(response.data._data);
        setLoading(false);
      } catch (error) {
        console.error("Error uploading file:", error);
        setLoading(false);
      }
    } else {
      setError(true);
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
        animation: `${dropDownAnimation} 2s ease-out`,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginBottom: 3,
        }}
      >
        Built by Olivie Bergeron
      </Typography>
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
            padding: 4,
            width: "30%",
            flexDirection: "column",
          }}
        >
          <CustomButton
            title={"Insert File"}
            onChange={fileHandling}
            buttonIcon={<CloudUploadIcon />}
          >
            File
          </CustomButton>
          <Button onClick={uploadFile}>Upload</Button>
          {file && <Grid>Selected File: {file.name}</Grid>}
          {error && (
            <Grid style={{ color: "red" }}>
              Select a file please and thank you!
            </Grid>
          )}
        </Paper>
      </Grid>

      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {data.length > 0 && <CustomTable data={data} />}
        </Paper>
      </Grid>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  );
}
