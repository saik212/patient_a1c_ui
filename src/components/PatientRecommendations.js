const NUTRITIONAL_RECOMMENDATIONS = {
  normal: ['A1c levels normal. No nutritional recommendations.'],
  prediabetic: [
    'Consider eating fewer or no processed carbohydrates.',
    'Reduce sugar intake. Prioritize natural sugar over refined sugar.'
  ],
  diabetic: [
    'Reduce carbohydrate intake to below 30g per meal.'
  ]
}

const FITNESS_RECOMMENDATIONS = {
  normal: ['A1c levels normal. No fitness recommendations.'],
  general: ['Physical activity for 200 minutes/week minimum.'],
  highBMI: ['Recommended to lose 5-10 lbs over 3 weeks.']
}

export default function PatientRecommendations(props) {
  const  {currentA1c, a1cStatus, age, bmi } = props.patient

  const renderNutritionalRecommendations = () => {
    const recs = NUTRITIONAL_RECOMMENDATIONS[a1cStatus]
    if (a1cStatus === 'diabetic') recs.push(...NUTRITIONAL_RECOMMENDATIONS.prediabetic)
    return recs.map((rec, idx) => {
      return <li key={idx}>{rec}</li>
    })
  }

  const renderFitnessRecommendations = () => {
    const recs = []
    if (a1cStatus !== 'normal') {
      recs.push(...FITNESS_RECOMMENDATIONS.general)
      if (a1cStatus === 'diabetic' && bmi > 25 ) recs.push(...FITNESS_RECOMMENDATIONS.highBMI)
    } else {
      recs.push(...FITNESS_RECOMMENDATIONS.normal)
    }

    return recs.map((rec, idx) => {
      return <li key={idx}>{rec}</li>
    })
  }

  return (
    <>
    <ul>
      Nutritional Recommendations
      {renderNutritionalRecommendations()}
    </ul>
    <ul>
      Fitness Recommendations
      {renderFitnessRecommendations()}
    </ul>
    </>
  );
}