import React, { useState, useEffect, useContext } from 'react';
import { FhirClientContext } from '../FhirClientContext';
import A1cChart from './A1cChart'
import CurrentA1cPanel from './CurrentA1cPanel'

const LOINC_CODES = {
  a1c: '4548-4',
  weight: '29463-7',
  height: '8302-2',
  bmi: '39156-5',
  ldl: '22748-8',
  // dbp: '8462-4',
  // sbp: '8480-6',
  bp: '55284-4'
}

const mapVitals = (vitals) => {
  const mappedVitals = {}
  for (const vital in LOINC_CODES) {
    if (Object.hasOwnProperty.call(LOINC_CODES, vital)) {
      const code = LOINC_CODES[vital];
      mappedVitals[vital] = getVitalsByCode(vitals, code)
    }
  }
  return mappedVitals
}

const getVitalsByCode = (vitals, code) => {
  if (!vitals) return []

  return vitals.filter(vital => vital.code.coding[0].code === code)
}

export default function PatientA1c () {
  const fhirContext = useContext(FhirClientContext)
  const fhirClient = fhirContext.client
  const [vitals, setVitals] = useState(null)
  let mappedVitals = vitals ? mapVitals(vitals) : {}
  const vitalsComponents = () => {
    if (vitals) {
      console.log(mappedVitals.a1c[0])
      return (
        <>
        <CurrentA1cPanel currentA1c={mappedVitals.a1c[0]}/>
        <A1cChart a1cVitals={mappedVitals.a1c ?? []}/>
        </>
      )
    }
    return (<></>)
  }

  useEffect(() => {
    const query = new URLSearchParams();
    query.set('patient', fhirClient.patient.id);
    query.set('_count', 100);
    query.set('_sort', '-date');
    query.set('code', Object.values(LOINC_CODES).map(code => {return `http://loinc.org|${code}`} ).join(','));

    fhirClient.request('Observation?' + query, {
      pageLimit: 0,
      flat: true
    }).then(vitals => {
      setVitals(vitals)
      mappedVitals = mapVitals(vitals)
    })
  }, [])


  return (
    <>
    {vitals && vitalsComponents()}
    </>
  )
}
