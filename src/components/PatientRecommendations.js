import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const NUTRITIONAL_RECOMMENDATIONS = {
  normal: ["A1c levels normal. No nutritional recommendations."],
  prediabetic: [
    "Consider eating fewer or no processed carbohydrates.",
    "Reduce sugar intake. Prioritize natural sugar over refined sugar.",
  ],
  diabetic: ["Reduce carbohydrate intake to below 30g per meal."],
};

const FITNESS_RECOMMENDATIONS = {
  normal: ["A1c levels normal. No fitness recommendations."],
  general: ["Physical activity for 200 minutes/week minimum."],
  highBMI: ["Recommended to lose 5-10 lbs over 3 weeks."],
};

export default function PatientRecommendations(props) {
  const { currentA1c, a1cStatus, age, bmi } = props.patient;

  const getNutritionalRecommendations = () => {
    const recs = NUTRITIONAL_RECOMMENDATIONS[a1cStatus];
    if (a1cStatus === "diabetic")
      recs.push(...NUTRITIONAL_RECOMMENDATIONS.prediabetic);
    return recs;
  };

  const getFitnessRecommendations = () => {
    const recs = [];
    if (a1cStatus !== "normal") {
      recs.push(...FITNESS_RECOMMENDATIONS.general);
      if (a1cStatus === "diabetic" && bmi > 25)
        recs.push(...FITNESS_RECOMMENDATIONS.highBMI);
    } else {
      recs.push(...FITNESS_RECOMMENDATIONS.normal);
    }

    return recs;
  };

  const mapRecsToUL = (recs) => {
    return (
      <ul style={{ listStyle: "none" }}>
        {recs.map((rec, idx) => {
          return (
            <li key={idx} style={{ margin: "10px 0", padding: "0 10px" }}>
              {rec}
            </li>
          );
        })}
      </ul>
    );
  };

  const PatientRecommendations = () => {
    const nutritionRecs = getNutritionalRecommendations();
    const fitnessRecs = getFitnessRecommendations();
    const rows = [
      {
        nutritionRecs: mapRecsToUL(nutritionRecs),
        fitnessRecs: mapRecsToUL(fitnessRecs),
      },
    ];
    return (
      <TableContainer component={Paper} className="a1c-table">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ paddingLeft: "25px", fontWeight: "bold" }}>
                Nutritional Recommendations
              </TableCell>
              <TableCell style={{ paddingLeft: "25px", fontWeight: "bold" }}>
                Fitness Recommendations
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow
                key={idx}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  style={{ verticalAlign: "top" }}
                >
                  {row.nutritionRecs}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ verticalAlign: "top" }}
                >
                  {row.fitnessRecs}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <div className="recommendations a1c-panel">
      <Typography
        component="h2"
        variant="h6"
        color="primary"
        gutterBottom
        className="panel-header"
      >
        Patient Recommendations
      </Typography>
      <PatientRecommendations />
    </div>
  );
}
