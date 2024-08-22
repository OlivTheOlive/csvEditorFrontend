import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface CustomPieProps {
  data: Record<string, any>[];
}

export default function PieChartComponent({ data }: CustomPieProps) {
  const [pickedType, setPickedType] = React.useState<string>("TYPE"); // Default is Type
  const handleChange = (event: SelectChangeEvent<string>) => {
    setPickedType(event.target.value);
  };

  // Use useMemo to memoize the computation of data points
  // This ensures that the computation is only done when the data or pickedType changes
  const dataPoints = React.useMemo(() => {
    const counts = data.reduce((acc, item) => {
      const type = item[pickedType] || item.TYPE;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Convert the counts object to an array of data points for the PieChart
    return Object.entries(counts).map(([label, value], index) => ({
      id: index,
      value,
      label,
    }));
  }, [data, pickedType]);

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="type-picker-label">Select Data Type</InputLabel>
        <Select
          labelId="type-picker-label"
          id="type-picker"
          value={pickedType}
          label="Select Data Type"
          onChange={handleChange}
        >
          <MenuItem value="TYPE">TYPE</MenuItem>
          <MenuItem value="COUNTY">COUNTY</MenuItem>
          <MenuItem value="GROUP">GROUP</MenuItem>
        </Select>
      </FormControl>
      <PieChart
        series={[
          {
            data: dataPoints,
          },
        ]}
        width={350}
        height={200}
      />
    </div>
  );
}
