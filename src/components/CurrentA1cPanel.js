import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const getA1cStatus = (value) => {
  if (5.7 < value <= 6.5) return 1
  if (value >= 6.5) return 2
  return 0
}
const A1C_STATUS_TEXT = {
  0: {text: 'Normal', color: "green"},
  1: {text: 'High - Prediabetic', color: "orange"},
  2: {text: 'High - Diabetic *', color: 'red'}
}
export default function CurrentA1cPanel(props) {
  const a1cStatus = getA1cStatus(props.currentA1c.valueQuantity.value)
  const A1cStatusText = () => {
    return (
      <Typography component="span" variant="h4" color={A1C_STATUS_TEXT[a1cStatus].color}>
        {A1C_STATUS_TEXT[a1cStatus].text}
      </Typography>
    )
  }

  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>Latest A1c Result</Typography>
      <Typography component="p" variant="h4">
        {props.currentA1c.valueQuantity.value}
      </Typography>
      <Typography component="p" variant="h4" >
        Status: <A1cStatusText/>
      </Typography>


      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {new Date(props.currentA1c.effectiveDateTime).toLocaleDateString()}
      </Typography>
    </>
  );
}