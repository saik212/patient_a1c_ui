import Typography from "@mui/material/Typography";
import CurrentA1cTable from "./CurrentA1cTable";

export default function CurrentA1cPanel(props) {
  const { a1cStatus } = props.currentA1c;
  const a1cData = {
    date: new Date(props.currentA1c.effectiveDateTime).toLocaleDateString(),
    result: parseFloat(props.currentA1c.value).toFixed(2),
    status: a1cStatus,
  };

  return (
    <div className="current-a1c-panel a1c-panel">
      <Typography
        component="h2"
        variant="h6"
        color="primary"
        gutterBottom
        className="panel-header"
      >
        Latest A1c Result
      </Typography>
      <CurrentA1cTable a1cData={a1cData} />
    </div>
  );
}
