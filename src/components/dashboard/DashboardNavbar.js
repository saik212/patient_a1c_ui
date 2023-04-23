import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import { FhirClientContext } from "../../FhirClientContext";

const calculateAge = (date) => {
  const today = new Date();
  const birthDate = new Date(date);
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    return age - 1;
  }
  return age;
};
const DashboardNavbars = (props) => {
  const name = props.name.find(
    (nameRecord) => nameRecord.use === "official"
  ) || [0];
  return (
    <AppBar elevation={0}>
      <div style={{ margin: "auto" }}>
        <Toolbar>
          <span style={{ paddingLeft: 2, fontSize: 25 }}>
            Name: {name.given.join(" ") + " " + name.family} | Gender:{" "}
            {props.gender} | Age: {calculateAge(props.birthDate)}
          </span>
        </Toolbar>
      </div>
    </AppBar>
  );
};

export default class DashboardNavbar extends React.Component {
  static contextType = FhirClientContext;

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      patient: null,
      error: null,
    };
  }

  componentDidMount() {
    const client = this.context.client;
    this._loader = client.patient
      .read()
      .then((patient) => {
        this.setState({ patient, loading: false, error: null });
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
  }

  render() {
    const { error, loading, patient } = this.state;

    if (loading) {
      return null;
    }
    if (error) {
      console.log(error.message);
      return error.message;
    }
    return <DashboardNavbars {...patient} />;
  }
}
