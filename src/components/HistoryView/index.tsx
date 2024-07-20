import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

interface HistoryItem {
  _id: string;
  createdAt: string;
  records: Record<string, any>[];
  name: string;
}

interface HistoryViewProps {
  history: HistoryItem[];
  onItemClick: (item: HistoryItem) => void; // New prop for handling item clicks
}

const HistoryView: React.FC<HistoryViewProps> = ({ history, onItemClick }) => {
  if (history.length === 0) {
    return <Typography>No history available</Typography>;
  }

  return (
    <List>
      {history.map((entry) => (
        <ListItem key={entry._id} button onClick={() => onItemClick(entry)}>
          <ListItemText
            primary={entry.name}
            secondary={new Date(entry.createdAt).toLocaleString()}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default HistoryView;
