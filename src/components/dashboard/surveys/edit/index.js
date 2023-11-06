import React, { useEffect, useState } from 'react'
import SurveyForm from '../form'
import { Card, Grid, CardContent, CardHeader, CircularProgress } from '@mui/material'
import { defaultCommentBoxQuestionList, default as initialValues } from '../form/util/initialValues'
import useFetch from 'hooks/useFetch'
import Questions from 'components/dashboard/surveyReport/common/questions'

const EditSurvey = props => {
  const id = props.match.params.id
  const { data, loading } = useFetch(id && '/v2/survey/getSurvey/' + id)
  const [surveyToEdit, setSurveyToEdit] = useState(null)

  useEffect(() => {
    if (!loading) {
      const survey = JSON.parse(JSON.stringify(data))
      if (survey.contact) {
        survey.contact.contactFields = survey.contact.contactFields?.map(field => {
          let requiredFor = {
            Felicitación: field.requiredFor.includes('Felicitación'),
            Sugerencia: field.requiredFor.includes('Sugerencia'),
            Reclamo: field.requiredFor.includes('Reclamo')
          }
          return { ...field, requiredFor }
        })
      }

      if (survey.csat) {
        survey.csat.questionList = survey.csat?.questionList.map(question => {
          return { ...question, priority: question.priority || 0 }
        })

        if (survey.csat?.scale === undefined) survey.csat.scale = ''
      }

      if (survey.commentBox?.questionList?.length === 0)
        survey.commentBox.questionList = defaultCommentBoxQuestionList

      if (!survey.rating) survey.rating = initialValues.rating

      if (survey.commentBox?.questionList) {
        let test = ''
        survey?.commentBox?.questionList.map((question, index) => {
          if (question?.aboutSelect) {
            const stringValues =
              survey.commentBox.questionList[index].aboutSelect.options.toString()
            survey.commentBox.questionList[index].aboutSelect.options = stringValues
          }
        })
      }
      setSurveyToEdit(survey)
    }
  }, [loading])

  return loading && !surveyToEdit ? (
    <Grid container>
      <Grid item xs={12}>
        <Card square elevation={0}>
          <CardHeader />
          <CardContent
            className="quadrant-container-card__content"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <CircularProgress />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  ) : (
    surveyToEdit && <SurveyForm survey={surveyToEdit} title="Editar encuesta" />
  )
}

export default EditSurvey
