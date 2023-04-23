import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Typography from "@mui/material/Typography";

function createChartData(date, value) {
  const dateTime = new Date(date);
  return {
    time: dateTime.toLocaleDateString(),
    amount: value,
  };
}

export default function A1cChart(props) {
  const theme = useTheme();
  const data = props.a1cVitals
    .map((vitals) =>
      createChartData(vitals.effectiveDateTime, vitals.valueQuantity.value)
    )
    .reverse();

  return (
    <div className="a1c-chart a1c-panel">
      <Typography
        component="h2"
        variant="h6"
        color="primary"
        gutterBottom
        className="panel-header"
      >
        A1c Results
      </Typography>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              A1c Level (%)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
