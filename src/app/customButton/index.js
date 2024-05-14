import { Button } from "@mui/material";
function CustomButton({ title, buttonStyle }) {
  return (
    <Button style={buttonStyle} title={title}>
      File
    </Button>
  );
}

export default CustomButton;
