import { createStyles, makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    "@global": {
      "*": {
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
      },
      html: {
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
        height: "100%",
        width: "100%",
      },
      body: {
        backgroundColor: "#f4f6f8",
        height: "100%",
        width: "100%",
      },
      a: {
        textDecoration: "none",
      },
      "#root": {
        height: "100%",
        width: "100%",
      },
      ".a1c-panel": {
        border: "1px solid white",
        padding: "25px 15px",
        "margin-top": "15px",
        "border-radius": "10px",
        "margin-right": "20px",
        "box-shadow": "0px 0px 15px grey",
      },
      ".panel-header": {
        "margin-bottom": "0.5em !important",
        "text-align": "center",
        "font-size": "20px !important",
      },
      ".a1c-chart": {
        width: "100%",
        height: "50%",
        "padding-bottom": "40px",
      },
      ".a1c-table": {
        "background-color": "#f4f6f8",
      },
      ".recommendations": {},
      ".current-a1c-panel": {
        "margin-left": "5px",
      },
    },
  })
);

const GlobalStyles = () => {
  useStyles();

  return null;
};

export default GlobalStyles;
