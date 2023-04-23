import { useContext, useState } from "react";
import PatientA1c from "../PatientA1c";
import { FhirClientContext } from "../../FhirClientContext";
import { calculateAge } from "../../utils";

export default function Dashboard() {
  const fhirContext = useContext(FhirClientContext);
  const fhirClient = fhirContext.client;

  const [patientAge, setPatientAge] = useState(null);
  const [patientGender, setPatientGender] = useState(null);
  const [patientName, setPatientName] = useState(null);
  const patient = {
    age: patientAge,
    gender: patientGender,
    name: patientName,
  };

  fhirClient.patient.read().then(({ birthDate, name, gender }) => {
    setPatientAge(calculateAge(birthDate));
    setPatientGender(gender);
    setPatientName(`${name[0].given[0]} ${name[0].family}`);
  });

  return (
    <>
      <PatientA1c patient={patient} />
    </>
  );
}
