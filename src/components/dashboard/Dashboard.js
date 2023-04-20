import {useContext, useState} from 'react'
import PatientA1c from '../PatientA1c';
import { FhirClientContext } from '../../FhirClientContext';

const calculateAge = (date) => {
  const today = new Date();
  const birthDate = new Date(date);
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1
  }
  return age;
}

export default function Dashboard() {
  const fhirContext = useContext(FhirClientContext)
  const fhirClient = fhirContext.client

  const [patientAge, setPatientAge] = useState(null)
  const [patientGender, setPatientGender] = useState(null)
  const [patientName, setPatientName] = useState(null)
  const patient = {
    age: patientAge,
    gender: patientGender,
    name: patientName
  }

  fhirClient.patient.read().then(({birthDate, name, gender}) => {
    setPatientAge(calculateAge(birthDate));
    setPatientGender(gender);
    setPatientName(`${name[0].given[0]} ${name[0].family}`)
  })

  return (
    <>
    <PatientA1c patient={patient}/>
    </>
  );
}