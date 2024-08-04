import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

interface CustomPieProps {
  data: Record<string, any>[];
}

export default function PieChartComponent({ data }: CustomPieProps) {
  // Use useMemo to memoize the computation of data points
  // This ensures that the computation is only done when the data prop changes
  const dataPoints = React.useMemo(() => {
    // Reduce the data array to count occurrences of each TYPE
    const counts = data.reduce((acc, item) => {
      const type = item.TYPE;
      // Increment the count for the current type, initializing to 0 if it doesn't exist
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Convert the counts object to an array of data points for the PieChart
    return Object.entries(counts).map(([label, value], index) => ({
      id: index,
      value,
      label,
    }));
  }, [data]);

  return (
    <PieChart
      series={[
        {
          data: dataPoints,
        },
      ]}
      width={350}
      height={200}
    />
  );
}
