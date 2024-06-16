"use client";
import React, { useState, ChangeEvent } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import axios from "axios";
import CustomButton from "@/components/CustomButton/index";
import CustomTable from "@/components/CustomTable/CustomTable";
import { Backdrop, Button, CircularProgress, Typography } from "@mui/material";
import { keyframes } from "@mui/system";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import HistoryView from "@/components/HistoryView";

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
 * Uses react hooks for state management and handles file uploads asynchronously using axios.
 * @returns {JSX.Element} React component with file input, upload button, and data table.
 */
export default function Home(): JSX.Element {
  const [data, setData] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<
    Array<{ id: number; timestamp: string; data: Record<string, any>[] }>
  >([]);

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
          "http://localhost:3030/api/upload",
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
  /**
   * Function to save updated data to the server.
   * @param updatedData Updated data to send to the server.
   * @returns Promise<void>
   */
  async function saveFile(updatedData: any[]): Promise<void> {
    if (updatedData && updatedData.length > 0) {
      setError(false);
      setLoading(true);

      try {
        const response = await axios.post(
          "http://localhost:3030/api/update",
          { data: updatedData },
          {
            responseType: "blob",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Handle the file download
        const blob = new Blob([response.data], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "data.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        // await fetchHistory();
        // try {
        //   // Fetch history after saving the file
        //   const historyResponse = await axios.get(
        //     "http://localhost:3030/api/history"
        //   );
        //   console.log(historyResponse);
        //   // setHistory(historyResponse);
        // } catch (error) {
        //   console.error("Error saving history:", error);
        // }

        setLoading(false);
      } catch (error) {
        console.error("Error saving data:", error);
        setLoading(false);
      }
    } else {
      setError(true);
    }
  }
  // async function fetchHistory() {
  //   try {
  //     const response = await fetch("http://localhost:3030/api/history", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     console.log(data);
  //     setHistory(data);
  //   } catch (error) {
  //     console.error("Error fetching history:", error);
  //   }
  // }

  const handleUpdatedData = (updatedData: Record<string, any>[]) => {
    setData(updatedData);
    // saveFile(updatedData);
  };

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
        {/* <Paper
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
          <HistoryView history={history} />
        </Paper> */}
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
        <Button onClick={() => saveFile(data)}>Save File</Button>
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {data.length > 0 && (
            <CustomTable data={data} onUpdatedData={handleUpdatedData} />
          )}
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
