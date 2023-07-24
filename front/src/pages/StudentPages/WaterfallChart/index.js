import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";

export default function WaterfallChart({ experimentData, studentData }) {
  const storedName = localStorage.getItem("name");
  const data =
    experimentData &&
    studentData &&
    experimentData.map((d, i) => ({
      index: i,
      Experimento: d,
      [storedName]: studentData[i],
    }));

  const hasNegativeValue =
    data &&
    (experimentData.some((d) => d < 0) || studentData.some((d) => d < 0));

  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="index" />
      <YAxis domain={["auto", "auto"]} allowDataOverflow={true} />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Experimento" stroke="#8884d8" />
      <Line type="monotone" dataKey={`${storedName}`} stroke="#82ca9d" />
      {hasNegativeValue && (
        <ReferenceLine
          y={0}
          stroke="#ff0000"
          strokeDasharray="5 5"
          yAxisId={0}
          position="insideTopRight"
        />
      )}
      <ReferenceLine y={50} stroke="orange" strokeDasharray="5 5" yAxisId={0} />
    </LineChart>
  );
}
