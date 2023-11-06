import React, { useEffect, useState } from 'react'
import { Grid, Button, Card, CardHeader, CardContent, CardActions } from '@mui/material'
import SurveyCard from '../surveyCard/surveyCard'
import AddSurvey from '../addSurvey/addSurvey'
import * as Yup from 'yup'
import timezonesServices from 'services/web_services/timezones'
import { Form, Dropdown, TextField } from 'components/forms'
import { useForm, useFieldArray } from 'react-hook-form'
import httpModule from 'services/httpModule'
import { useHistory } from 'react-router-dom'
import TagsContainer from '../tagsContainer'
import AddTag from '../addTag'
import yupResolver from 'hooks/useYupValidationResolver'

const AddGroupSchema = Yup.object().shape({
  name: Yup.string().required('Obligatorio'),
  timezone: Yup.string().required('Obligatorio'),
  country: Yup.string().required('Obligatorio'),
  region: Yup.string().required('Obligatorio')
})

const initialValues = {
  name: '',
  timezone: '',
  country: '',
  region: '',
  district: '',
  address: '',
  fullName: '',
  cellphone: '',
  email: '',
  contactName: '',
  contactPhone: '',
  contactEmail: '',
  surveyList: [],
  tags: []
}

export default function GroupForm({ group }) {
  const [timezones, setTimezones] = useState([])
  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])
  //const [cities, setCities] = useState([])
  const formMethods = useForm({
    defaultValues: group ?? initialValues,
    resolver: yupResolver(AddGroupSchema)
  })
  const countryWatcher = formMethods.watch('country')
  //const stateWatcher = formMethods.watch('region')
  //const cityWatcher = formMethods.watch('city')
  const history = useHistory()
  const { fields, append, remove } = useFieldArray({
    control: formMethods.control,
    name: 'surveyList',
    keyName: 'key'
  })

  const [tagsArray, setTagsArray] = useState(new Set(group?.tags || []))

  const handleAddSurvey = survey => {
    append(survey)
  }

  const handleDiscardSurvey = survey => {
    const index = fields.findIndex(entry => entry.id === survey.id)
    remove(index)
  }

  useEffect(() => {
    httpModule.get('/v1/countries').then(res => {
      setCountries(res.data)
      formMethods.setValue('state', '')
    })
    timezonesServices.listTimezones().then(res => {
      setTimezones(res.data)
    })
  }, [])

  useEffect(() => {
    if (countryWatcher) {
      httpModule.get('/v1/countries/states?country=' + countryWatcher).then(res => {
        setStates(res.data)
        formMethods.setValue('city', '')
      })
    }
  }, [countryWatcher])

  /*
  useEffect(()=>{
    if (stateWatcher) {
//      httpModule.get('/v1/countries/cities?country='+countryWatcher+'&state='+stateWatcher).then(res=> { setCities(res.data) }) 
    }
  }, [stateWatcher])
   **/

  const handleSubmit = values => {
    const data = { ...values, tags: [...tagsArray] }
    data.surveyList = data.surveyList.map(({ id }) => id)
    httpModule.post('/v1/evaluationGroups', data).then(() => {
      history.goBack()
    })
    //.catch(err => {})
  }

  const handleAddTag = newTag => {
    const newTagsArray = [...tagsArray].concat(newTag)
    httpModule.post('/v1/tags', { tag: newTag }).then(() => {
      setTagsArray(new Set(newTagsArray))
    })
  }

  const handleRemoveTag = tag => {
    const newTagsSet = new Set(tagsArray)
    newTagsSet.delete(tag)
    setTagsArray(newTagsSet)
  }

  return (
    <>
      <Form onSubmit={handleSubmit} formMethods={formMethods}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Card square elevation={0}>
              <CardHeader title="Crear punto de evaluación diferenciado" />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Card variant="outlined">
                      <CardHeader
                        title="Datos generales"
                        subheader="Esta información impactará la reportería del sistema"
                      />
                      <CardContent style={{ paddingTop: '0px' }}>
                        <Grid container spacing={1} justifyContent="center">
                          <Grid item xs={12} sm={8}>
                            <TextField
                              name="name"
                              label="Nombre de Grupo de Evaluación"
                              placeholder="Ej. Benavides, Lima, Sarah Connor"
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Dropdown
                              name="timezone"
                              options={timezones || []}
                              label="Huso Horario"
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Dropdown name="country" options={countries || []} label="País" />
                          </Grid>

                          <Grid item xs={12} sm={4}>
                            <Dropdown name="region" options={states || []} label="Región" />
                          </Grid>
                          {/*
                          <Grid item xs={12} sm={4}>
                            <Dropdown
                              name="city"
                              options={cities || [cityWatcher]}
                              label="Ciudad"
                            />
                          </Grid>
                          */}
                          <Grid item xs={12} sm={4}>
                            <TextField
                              name="district"
                              label="Distrito"
                              autoComplete="off"
                              placeholder="Ej. Santiago de Surco"
                            />
                          </Grid>

                          <Grid item xs={12} sm={12}>
                            <TextField
                              name="address"
                              label="Dirección"
                              autoComplete="street-address"
                              placeholder="Ej. Av. El Derby 254"
                              variant="outlined"
                              margin="normal"
                            />
                          </Grid>

                          <Grid item xs={12} sm={12}>
                            <AddTag handleAddTag={handleAddTag} excludedTags={[...tagsArray]} />
                            <TagsContainer
                              tags={[...tagsArray]}
                              handleRemoveTag={handleRemoveTag}
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <Card variant="outlined">
                      <CardHeader
                        title="Datos de contacto"
                        subheader="Información para brindarle atención a este punto"
                      />
                      <CardContent sx={{ paddingTop: '0px' }}>
                        <Grid container spacing={1}>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              name="contactName"
                              label="Nombre de Encargado"
                              placeholder="Ej. Juan Perez"
                              autoComplete="off"
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              name="contactEmail"
                              label="Correo Electrónico"
                              placeholder="Ej. nombre@quadrant.pe"
                              autoComplete="off"
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              name="contactPhone"
                              label="Celular"
                              placeholder="Ej. +51-999-999-999"
                              autoComplete="off"
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  {group && (
                    <Grid item xs={12}>
                      <Card variant="outlined">
                        <CardHeader
                          title="Asignación de Encuestas"
                          subheader="Estas encuestas se están aplicando a este punto de evaluación"
                        />
                        <CardContent style={{ paddingTop: '0px' }}>
                          <Grid container spacing={1}>
                            {fields?.map((survey, index) => {
                              return (
                                <Grid item xs={12} sm={6} md={4} className="mt-1" key={index}>
                                  <SurveyCard survey={survey} handleDiscard={handleDiscardSurvey} />
                                </Grid>
                              )
                            })}
                          </Grid>
                        </CardContent>
                        <CardActions>
                          <AddSurvey
                            //isSubmitting={isSubmitting}
                            excludedSurveys={fields}
                            handleAddSurvey={handleAddSurvey}
                          />
                        </CardActions>
                      </Card>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
              <CardActions style={{ justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  //disabled={isSubmitting}
                  onClick={() => history.push('/quadrant/groups/')}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="large"
                  //disabled={isSubmitting}
                  className="ml-1"
                >
                  Guardar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </>
  )
}
