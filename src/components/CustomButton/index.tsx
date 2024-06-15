import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

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
interface CustomBottonProps {
  title: string;
  buttonStyle?: React.CSSProperties;
  children: React.ReactNode;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  buttonIcon: React.ReactNode;
}

/**
 * Renders a styled file input button using Material-UI components.
 * The actual file input element is visually hidden but accessible for screen readers and functional via a styled button.
 *
 * @param {CustomFileInputProps} props - The props object containing the title, buttonStyle, children, and onChange function.
 * @returns {JSX.Element} A styled button that visually masks a file input element.
 */
const CustomButton: React.FC<CustomBottonProps> = ({
  title,
  buttonStyle,
  children,
  onChange,
  buttonIcon,
}) => {
  return (
    <Button
      style={buttonStyle}
      title={title}
      startIcon={buttonIcon}
      component="label"
      variant="contained"
    >
      {children}
      <VisuallyHiddenInput type="file" onChange={onChange} />
    </Button>
  );
};

export default CustomButton;
