import React from "react";

interface HistoryViewProps {
  history: Array<{
    id: number;
    timestamp: string;
    data: Record<string, any>[];
  }>;
}

const HistoryView: React.FC<HistoryViewProps> = ({ history }) => {
  if (history.length === 0) {
    return <div>No history available</div>;
  }

  return (
    <div>
      <h2>History</h2>
      <ul>
        {history.map((entry) => (
          <li key={entry.id}>
            <p>{new Date(entry.timestamp).toLocaleString()}</p>
            <pre>{JSON.stringify(entry.data, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryView;
