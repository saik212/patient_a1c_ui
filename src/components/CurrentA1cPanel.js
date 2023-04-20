import Typography from '@mui/material/Typography';

const A1C_STATUS_TEXT = {
  normal: {text: 'Normal', color: "green"},
  prediabetic: {text: 'High - Prediabetic', color: "orange"},
  diabetic: {text: 'High - Diabetic *', color: 'red'}
}
export default function CurrentA1cPanel(props) {
  const {a1cStatus} = props.currentA1c
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
        {props.currentA1c.value}
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