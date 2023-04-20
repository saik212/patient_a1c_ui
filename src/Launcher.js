import React, { useEffect } from 'react';
import { oauth2 as SMART } from 'fhirclient';
import FHIR from 'fhirclient';

export default function Launcher() {
  useEffect(() => {
    SMART.authorize({
      clientId: 'my-client-id',
      scope: 'launch launch/patient patient/read offline_access',
      redirectUri: './app/test',
      iss: 'https://launch.smarthealthit.org/v/r4/sim/WzIsImIyMThjZWU5LTAxOWQtNDdhNC1iMTYxLWU5N2MwZmQ2ZjczNiIsIiIsIkFVVE8iLDEsMSwwLCIiLCIiLCIiLCIiLCIiLCIiLCIiLDAsMV0/fhir',

      completeInTarget: false
    });

    FHIR.oauth2.ready()
    .then(client => client.request("Patient"))
    .catch(console.error);
  }, [])

  return (
    <>Launching...</>
  )
}