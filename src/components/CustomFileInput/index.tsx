import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// Define the type for the hidden file input
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

// Define the type for the component props
interface CustomFileInputProps {
  title: string;
  buttonStyle?: React.CSSProperties;
  children: React.ReactNode;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Renders a styled file input button using Material-UI components.
 * The actual file input element is visually hidden but accessible for screen readers and functional via a styled button.
 *
 * @param {CustomFileInputProps} props - The props object containing the title, buttonStyle, children, and onChange function.
 * @returns {JSX.Element} A styled button that visually masks a file input element.
 */
const CustomFileInput: React.FC<CustomFileInputProps> = ({
  title,
  buttonStyle,
  children,
  onChange,
}) => {
  return (
    <Button
      style={buttonStyle}
      title={title}
      startIcon={<CloudUploadIcon />}
      component="label"
      variant="contained"
    >
      {children}
      <VisuallyHiddenInput type="file" onChange={onChange} />
    </Button>
  );
};

export default CustomFileInput;
