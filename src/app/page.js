import { Grid } from "@mui/material";
import CustomButton from "./customButton";

export default function Home() {
  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignContent: "center",
        minHeight: "100vh",
        flexDirection: "column",
      }}
    >
      <Grid>Add file</Grid>
      <CustomButton title={"Insert File"}>File</CustomButton>
    </Grid>
  );
}
