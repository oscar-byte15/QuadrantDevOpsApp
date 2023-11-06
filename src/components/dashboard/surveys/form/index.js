import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Grid,
  Button,
  CardActions,
  Divider,
  Card,
  CardHeader,
  CardContent,
  FormHelperText
} from '@mui/material'
import surveysServices from 'services/web_services/surveys'
import firebase from 'services/firebase'
import SurveySchema from './util/surveySchema'
import Module from './modules/module'
import Traceability from './modules/traceability'
import Welcome from './modules/welcome'
import Csat from './modules/csat'
import Nps from './modules/nps'
import Contact from './modules/contact'
import Farewell from './modules/farewell'
import Rating from './modules/rating'
import Switch from './common/controlledSwitch'
import { useForm, FormProvider } from 'react-hook-form'
import './styles.css'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-toward-subtle.css'
import yupResolver from 'hooks/useYupValidationResolver'
import initialValues from './util/initialValues'
import SurveySettings from './modules/surveySettings'

/**
 * Component for survey forms (edit and create)
 * @component
 * @param {object} initialValues
 * @param {string} title
 */

const SurveyForm = ({ survey, title }) => {
  const [brand, setSelectedBrandId] = useState('')
  const [isNewSurvey, setIsNewSurvey] = useState(!survey)
  const formMethods = useForm({
    resolver: yupResolver(SurveySchema),
    mode: 'onBlur',
    defaultValues: survey ?? initialValues
  })
  const {
    formState: { errors }
  } = formMethods
  const formErrors = errors.form?.message
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const authId = useSelector(state => state.auth.id)
  function onSubmit(values) {
    setIsSubmitting(true)
    const updatedValues = {
      ...values,
      brand: brand
    }
    if (values.logoUrl === '' && !brand) {
      let imageName =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) +
        '.' +
        values.logo.type.split('/')[1]

      let uploadPromise = firebase
        .storage()
        .ref(authId)
        .child(`surveys/${imageName}`)
        .put(values.logo)
        .then(snap => snap.ref.getDownloadURL().then(logoUrl => logoUrl))

      uploadPromise
        .then(url => {
          return surveysServices.addSurvey({
            ...values,
            brand: brand,
            logoUrl: url
          })
        })
        .then(_ => {
          window.history.back()
        })
        .catch(error => {
          formMethods.setError('form', { message: error.message || error })
        })
        .then(() => setIsSubmitting(false))
    } else {
      surveysServices
        .addSurvey({ ...values, brand })
        .then(res => {
          window.history.back()
        })
        .catch(error => {
          formMethods.setError('form', { message: error.message || error })
        })
        .then(() => setIsSubmitting(false))
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <Card square className="card-title">
          <CardHeader
            title={title}
            subheader="Administra los módulos, preguntas y ajustes de esta encuesta"
            action={
              <Tippy
                content="Activar o desactivar encuesta"
                placement="bottom-end"
                animation="shift-toward-subtle"
              >
                <Switch name="enabled" color="primary" />
              </Tippy>
            }
          />
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <SurveySettings
                  logoUrl={survey?.logoUrl}
                  timer={survey?.options.timer}
                  brand={survey?.brand}
                  setSelectedBrandId={setSelectedBrandId}
                />
              </Grid>
              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardHeader title="Encuesta" />
                  <CardContent>
                    <Grid container spacing={1}>
                      <Module name="traceability" label="Módulo de trazabilidad">
                        <Traceability />
                      </Module>
                      <Grid item xs={12}>
                        <Divider light />
                      </Grid>
                      <Module name="welcome" label="Mensaje de bienvenida">
                        <Welcome />
                      </Module>
                      <Grid item xs={12}>
                        <Divider light />
                      </Grid>
                      <Module name="csat" label="Módulo CSAT">
                        <Csat />
                      </Module>
                      <Grid item xs={12}>
                        <Divider light />
                      </Grid>
                      <Module name="rating" label="Módulo de Rating">
                        <Rating />
                      </Module>
                      <Module name="nps" label="Módulo NPS">
                        <Nps />
                      </Module>
                      <Grid item xs={12}>
                        <Divider light />
                      </Grid>
                      <Module name="contact" label="Módulo de Contacto y Comentarios">
                        <Contact />
                      </Module>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardHeader title="Despedida" />
                  <CardContent>
                    <Farewell />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <FormHelperText error> {formErrors}</FormHelperText>
          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              //TODO hacer funcionar el isSubmitting
              disabled={isSubmitting}
              onClick={() => window.history.back()}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              disableElevation
              color="primary"
              type="submit"
              disabled={isSubmitting}
              size="large"
            >
              Guardar
            </Button>{' '}
          </CardActions>
        </Card>
      </form>
    </FormProvider>
  )
}
SurveyForm.propTypes = {
  survey: PropTypes.object,
  title: PropTypes.string.isRequired
}
export default SurveyForm
