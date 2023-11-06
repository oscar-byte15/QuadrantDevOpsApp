import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import CsatSurvey from './csatsurvey/step1_csatAllSurveys'
import Survey from './csatsurvey/step2_csatSurvey'
import Question from './csatsurvey/step3_csatQuestion'
import CsatEvaluationPoint from './csatevaluationpoint/step1_csatAllPoints'
import EvaluationPoint from './csatevaluationpoint/step2_csatPoint'
import EvaluationGroupQuestion from './csatevaluationpoint/step3_csatSurvey'
import NpsEvaluationPoint from './npsevaluationpoint/step1_npsAnalysis'
import NpsEvaluationPointSurveys from './npsevaluationpoint/step2_npsAnalysis'
import { useDispatch } from 'react-redux'
import { cleanFilterVisibility, filterInIndicators } from 'redux/actions/filter/actionDispatcher'

export default function Analysis() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(filterInIndicators())
    return () => dispatch(cleanFilterVisibility())
    //eslint-disable-next-line
  }, [])

  return (
    <Switch>
      <Route
        path="/quadrant/analysis/csatsurvey/:surveyId/questions/:questionId"
        component={Question}
      />
      <Route path="/quadrant/analysis/csatsurvey/:surveyId/questions" component={Survey} />
      <Route path="/quadrant/analysis/csatsurvey" component={CsatSurvey} />

      <Route
        path="/quadrant/analysis/csatevapoint/:evaluationGroupId/surveys/:surveyId"
        component={EvaluationGroupQuestion}
      />
      <Route
        path="/quadrant/analysis/csatevagroup/:evaluationGroupId/surveys"
        component={EvaluationPoint}
      />
      <Route path="/quadrant/analysis/csatevagroup" component={CsatEvaluationPoint} />

      <Route
        path="/quadrant/analysis/npsevagroup/:evaluationGroupId/surveys"
        component={NpsEvaluationPointSurveys}
      />
      <Route path="/quadrant/analysis/npsevagroup" component={NpsEvaluationPoint} />
    </Switch>
  )
}
