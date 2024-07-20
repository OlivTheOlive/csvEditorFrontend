"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
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
  data: any[];
  id: string;
}

interface HistoryItem {
  _id: string;
  createdAt: string;
  records: Record<string, any>[];
  name: string;
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

export default function Home(): JSX.Element {
  const [data, setData] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get("http://localhost:3030/api/history");
        setHistory(response.data);
      } catch (err: any) {
        console.error("Error fetching history:", err);
      }
    };

    fetchHistory();
  }, []);

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
        setData(response.data.data);
        setId(response.data.id);
        setLoading(false);
      } catch (error) {
        console.error("Error uploading file:", error);
        setLoading(false);
      }
    } else {
      setError(true);
    }
  }

  async function saveFile(updatedData: any[]): Promise<void> {
    if (updatedData && updatedData.length > 0) {
      setError(false);
      setLoading(true);

      try {
        const response = await axios.post(
          "http://localhost:3030/api/update",
          { data: updatedData, id },
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

        setLoading(false);
      } catch (error) {
        console.error("Error saving data:", error);
        setLoading(false);
      }
    } else {
      setError(true);
    }
  }

  const handleItemClick = (item: HistoryItem) => {
    setSelectedItem(item);
    setData(item.records); // Update displayed data with the selected item's records
  };

  const handleUpdatedData = (updatedData: Record<string, any>[]) => {
    setData(updatedData);
    // saveFile(updatedData);
  };

  const handleClean = () => {
    setData([]); // Clear the table data
    setSelectedItem(null); // Reset the selected item
    setFile(null); // Clear the selected file
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
          <HistoryView history={history} onItemClick={handleItemClick} />
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
        <Button onClick={() => saveFile(data)}>Save File</Button>
        <Button
          onClick={handleClean}
          variant="outlined"
          color="error"
          sx={{ ml: 2 }}
        >
          Clean
        </Button>

        {data.length > 0 && (
          <CustomTable data={data} onUpdatedData={handleUpdatedData} />
        )}
      </Grid>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  );
}
