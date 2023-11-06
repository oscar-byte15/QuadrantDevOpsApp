import React from 'react'
import SurveyForm from '../form'

const initialValues = {
  name: '',
  description: ''
}

const AddSurvey = () => <SurveyForm title={'Crear encuesta'} initialValues={initialValues} />

export default AddSurvey
