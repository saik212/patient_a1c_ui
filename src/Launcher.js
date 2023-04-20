import React, { useEffect } from 'react';
import { oauth2 as SMART } from 'fhirclient';
import FHIR from 'fhirclient';

export default function Launcher() {
  useEffect(() => {
    // SMART.authorize({
    //   clientId: '5676caa9-ba7e-40b4-81aa-6e19b9517f83',
    //   scope: 'launch launch/patient patient/read offline_access patient/Patient.read patient/Observation.read patient/Observation.write patient/MedicationRequest.read ',
    //   redirectUri: 'https://skandala-6440-smartonfhir.herokuapp.com/app/dashboard',
    //   iss: 'https://fhir-ehr-code.cerner.com/r4/',
    //   // iss: 'https://r4.smarthealthit.org',

    //   completeInTarget: false
    // });

    // FHIR.oauth2.ready()
    // .then(client => client.request("Patient"))
    // .then(console.log('test'))
    // .catch(console.error);

    SMART.authorize({
      clientId: 'my-client-id',
      scope: 'launch launch/patient patient/read offline_access',
      redirectUri: './app/test',
      iss: 'https://launch.smarthealthit.org/v/r4/sim/WzIsImIyMThjZWU5LTAxOWQtNDdhNC1iMTYxLWU5N2MwZmQ2ZjczNiIsIiIsIkFVVE8iLDEsMSwwLCIiLCIiLCIiLCIiLCIiLCIiLCIiLDAsMV0/fhir',

      completeInTarget: false
    });

    FHIR.oauth2.ready()
    .then(client => client.request("Patient"))
    .then(console.log('test'))
    .catch(console.error);
  }, [])

  return (
    <>Launching...</>
  )
}