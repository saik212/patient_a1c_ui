import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import { FhirClientContext } from "../../FhirClientContext";
import { calculateAge } from "../../utils";

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
