import React, { useState, useEffect, useContext } from "react";
import { Grid } from "@material-ui/core";

import { FhirClientContext } from "../FhirClientContext";
import A1cChart from "./A1cChart";
import CurrentA1cPanel from "./CurrentA1cPanel";
import PatientRecommendations from "./PatientRecommendations";

const LOINC_CODES = {
  a1c: "4548-4",
  weight: "29463-7",
  height: "8302-2",
  bmi: "39156-5",
  ldl: "22748-8",
  bp: "55284-4",
};

const mapVitals = (vitals) => {
  const mappedVitals = {};
  for (const vital in LOINC_CODES) {
    if (Object.hasOwnProperty.call(LOINC_CODES, vital)) {
      const code = LOINC_CODES[vital];
      mappedVitals[vital] = getVitalsByCode(vitals, code);
    }
  }
  return mappedVitals;
};

const getVitalsByCode = (vitals, code) => {
  if (!vitals) return [];

  return vitals.filter((vital) => vital.code.coding[0].code === code);
};

const getA1cStatus = (currentA1c) => {
  if (!currentA1c) return null;
  if (currentA1c > 5.7) {
    if (currentA1c > 6.5) return "diabetic";
    return "prediabetic";
  }
  return "normal";
};

export default function PatientA1c(props) {
  const patient = props.patient;
  const fhirContext = useContext(FhirClientContext);
  const fhirClient = fhirContext.client;
  const [vitals, setVitals] = useState(null);
  let mappedVitals = vitals ? mapVitals(vitals) : {};
  const vitalsComponents = () => {
    if (vitals) {
      const currentA1c = mappedVitals.a1c[0];
      const a1cValue = currentA1c.valueQuantity.value;
      return (
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <CurrentA1cPanel
              currentA1c={{
                value: a1cValue,
                a1cStatus: getA1cStatus(a1cValue),
                effectiveDateTime: currentA1c.effectiveDateTime,
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <PatientRecommendations
              patient={{
                currentA1c: a1cValue,
                a1cStatus: getA1cStatus(a1cValue),
                bmi: mappedVitals.bmi[0].valueQuantity.value,
                ...patient,
              }}
            />
          </Grid>
          <Grid item xs={4} height={"500px"}>
            <A1cChart a1cVitals={mappedVitals.a1c ?? []} />
          </Grid>
        </Grid>
      );
    }
    return <></>;
  };

  useEffect(() => {
    const query = new URLSearchParams();
    query.set("patient", fhirClient.patient.id);
    query.set("_count", 100);
    query.set("_sort", "-date");
    query.set(
      "code",
      Object.values(LOINC_CODES)
        .map((code) => {
          return `http://loinc.org|${code}`;
        })
        .join(",")
    );

    fhirClient
      .request("Observation?" + query, {
        pageLimit: 0,
        flat: true,
      })
      .then((vitals) => {
        setVitals(vitals);
        mappedVitals = mapVitals(vitals);
      });
  }, []);

  return <>{vitals && vitalsComponents()}</>;
}
