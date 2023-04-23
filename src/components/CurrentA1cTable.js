import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const A1C_STATUS_TEXT = {
  normal: { text: "Normal", color: "green" },
  prediabetic: { text: "High - Prediabetic", color: "orange" },
  diabetic: { text: "High - Diabetic *", color: "red" },
};

export default function CurrentA1cTable(props) {
  const A1cStatusText = () => {
    return (
      <Typography
        component="span"
        variant="h4"
        color={A1C_STATUS_TEXT[props.a1cData.status].color}
      >
        {A1C_STATUS_TEXT[props.a1cData.status].text}
      </Typography>
    );
  };
  const rows = [
    {
      date: props.a1cData.date,
      result: props.a1cData.result,
      status: props.a1cData.status,
    },
  ];
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Date</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Result</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.date}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.result}
              </TableCell>
              <TableCell component="th" scope="row">
                <A1cStatusText />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
