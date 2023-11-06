import React, { useEffect, useState } from 'react'
import Dialog from 'components/modal/dialog'
import {
  Grid,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  Box,
  Typography,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  IconButton,
  Chip,
  Checkbox,
  Radio,
  RadioGroup,
  FormGroup,
  Stack
} from '@mui/material'
import { FileCopy, DataUsage } from '@mui/icons-material'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-toward-subtle.css'
import AdornedButton from 'components/common/buttons/adornedButton'
import { createUniqueLink } from 'services/web_services/links'
import { uniqueLinksState } from 'services/web_services/links'
import moment from 'moment'
import { setSnackbar } from 'redux/actions/snackbar/actionDispatcher'
import httpModule from 'services/httpModule'
import { useDispatch } from 'react-redux'

const baseUrl = process.env.REACT_APP_SURVEYS_URL

const expirationOptions = {
  '3 días': [3, 'days'],
  '7 días': [7, 'days'],
  '30 días': [30, 'days']
}

const INPUT_BLOCKS = ['Checkbox', 'RadioButton', 'Select', 'Normal', 'RepeatableGroup']

const DynamicLinkDialog = props => {
  const { open, canCreateUniqueLinks, link, onClose } = props

  const [dynamicUrl, setDynamicUrl] = useState()
  const [creatingUniqueLink, setCreatingUniqueLink] = React.useState(false)
  const [expiration, setExpiration] = React.useState('30 días')
  const [quota, setQuota] = React.useState(false)
  const [ratingProducts, setRatingProducts] = React.useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    if (open && canCreateUniqueLinks) {
      setDynamicUrl(
        process.env.REACT_APP_ENV === 'dev' ? `/${link.shortUrl}` : `${baseUrl}${link.shortUrl}`
      )
      uniqueLinksState()
        .then(({ data: { used, monthlyQuota } }) => {
          setQuota({ rest: monthlyQuota - used, total: monthlyQuota })
        })

        .catch(err => console.error('Quadrant client sin uniquelinks', err))

      if (link.survey?.rating?.enabled) {
        httpModule.get('/v1/rating/product').then(res => setRatingProducts(res.data))
      }
    }
    //eslint-disable-next-line
  }, [open])

  if (!open || !link) return null

  const { contact, traceability, rating } = link.survey

  const questionList = [
    ...contact?.contactFields?.map(cf => ({ id: cf.id, question: cf.contactField.question })),
    ...contact?.questionList
  ]

  const generateBase64 = () => {
    let jsonData = {}
    questionList.map(question => {
      let value = document.getElementById(question.id)?.value
      if (value) jsonData[question.id] = value
      return true
    })

    link.survey?.traceability?.questionList?.map(question => {
      const show = document.getElementsByName(`${question.id}.show`)?.[0]?.checked
      let value = undefined
      if (question.type === 'Checkbox') {
        value = document.querySelectorAll(`input[name='${question.id}']:checked`)
        if (Array.from(value).length > 0) {
          value = Array.from(value).map(val => val.value)
        } else value = null
      } else if (question.type === 'RadioButton') {
        value = document.querySelectorAll(`input[name='${question.id}']:checked`)
        if (Array.from(value).length > 0) value = value[0]?.value
        else value = null
      } else if (question.type === 'RepeatableGroup') {
        try {
          value = JSON.parse(document.getElementsByName(question.id)?.[0]?.value)
        } catch (e) {
          value = []
        }
      } else {
        value = document.getElementsByName(question.id)?.[0]?.value
      }

      if (value && show !== undefined)
        jsonData[question.id] = {
          value: value,
          show: show
        }

      return true
    })
    if (rating?.dynamicProducts) {
      let value = Array.from(
        document.querySelectorAll(`input[name='dynamicRatingProducts']:checked`)
      )

      if (value.length > 0) {
        jsonData['ratingProducts'] = value.map(({ value }) => value)
      }
    }

    return btoa(unescape(encodeURIComponent(JSON.stringify(jsonData))))
  }

  const generateDynamicLink = () => {
    const encodedString = generateBase64()
    setDynamicUrl(
      process.env.REACT_APP_ENV === 'dev'
        ? `/${link.shortUrl}?cfunq=${encodedString}`
        : `${baseUrl}${link.shortUrl}?cfunq=${encodedString}`
    )
  }

  const getExpiration = expiration => {
    const options = expirationOptions[expiration]

    return moment()
      .add(...options)
      .utc()
      .format('DD/MM/YYYY HH:mm:ss')
  }

  const generateUniqueLink = () => {
    const cfunq = generateBase64()
    if (cfunq === 'e30=') {
      alert('Debe llenar por lo menos un campo')
      return null
    }
    const exp = getExpiration(expiration)

    const data = {
      surveySlug: link.shortUrl,
      cfunq,
      expiration: exp
    }

    setCreatingUniqueLink(true)
    createUniqueLink(data)
      .then(res => {
        let link =
          process.env.REACT_APP_ENV === 'dev'
            ? `${res.data.uniqueLink.slice(-9)}`
            : `${res.data.uniqueLink}`
        setDynamicUrl(link)
        //TODO improve this
        setQuota({ ...quota, rest: quota.rest - 1 })
      })
      .catch(_ => alert('Ocurrió un error'))
      .then(_ => setCreatingUniqueLink(false))
  }

  const copyDynamicLinkToClipboard = () => {
    navigator.clipboard.writeText(dynamicUrl)
    dispatch(setSnackbar({ show: true, message: 'Link copiado' }))
  }

  return (
    <Dialog open={open} scroll="body" maxWidth="md" onClose={onClose}>
      <DialogTitle
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography variant="h6" component="span">
          Enlace trazable para {link.survey?.name}
        </Typography>
        <>
          {canCreateUniqueLinks && quota && (
            <Tippy
              content={`Quedan ${quota.rest} enlaces únicos disponibles`}
              placement="bottom-end"
              animation="shift-toward-subtle"
            >
              <Chip icon={<DataUsage />} label={`${quota.rest}/${quota.total}`} color="default" />
            </Tippy>
          )}
        </>
      </DialogTitle>
      <DialogContent dividers={true}>
        <form id="dynamic-survey-form">
          <Stack spacing={2}>
            {questionList.length !== 0 && (
              <>
                <Typography variant="h5" align="center">
                  Campos de contacto
                </Typography>
                <Box>
                  <Grid container spacing={2}>
                    {questionList?.map(question => (
                      <Grid key={question.id} item xs={12} sm={6}>
                        <Box>
                          <Typography style={{ fontWeight: '500' }}>{question.question}</Typography>
                          <Typography variant="caption">id: {question.id}</Typography>
                        </Box>
                        <TextField
                          id={question.id}
                          name={question.id}
                          label={'Ingresar ' + question.question}
                          variant="outlined"
                          autoComplete="off"
                          margin="normal"
                          fullWidth
                          style={{ margin: '8px 0 0 0' }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </>
            )}

            {traceability?.questionList.length !== 0 && (
              <>
                <Typography variant="h5" align="center">
                  Campos de trazabilidad
                </Typography>
                <Box>
                  <Grid container spacing={2}>
                    {traceability?.questionList
                      .filter(question => INPUT_BLOCKS.includes(question.type))
                      .map(question => (
                        <Grid key={question.id} item xs={12} sm={6}>
                          <Box>
                            <Typography style={{ fontWeight: '500' }}>
                              {question.question}
                            </Typography>
                            <Typography variant="caption">id: {question.id}</Typography>
                          </Box>
                          <Field key={question.id} question={question} />
                          <FormControlLabel
                            title="Se mostrará el campo aún así esté completado"
                            label="Mostrar"
                            control={<Checkbox name={`${question.id}.show`} defaultChecked />}
                          />
                        </Grid>
                      ))}
                  </Grid>
                </Box>
              </>
            )}

            {rating?.dynamicProducts && (
              <>
                <Typography variant="h5" align="center">
                  Rating dinámico
                </Typography>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontSize: '1.2rem' }} gutterBottom>
                    Productos:
                  </Typography>
                  <Grid container spacing={2}>
                    {ratingProducts.map(option => (
                      <Grid item key={option.id}>
                        <label
                          style={{
                            backgroundColor: '#f7f7f7',
                            borderRadius: '6px',
                            padding: '9px 10px 9px 0',
                            marginLeft: '0',
                            userSelect: 'none'
                          }}
                        >
                          <input
                            key={option}
                            type="checkbox"
                            name="dynamicRatingProducts"
                            value={option.id}
                            style={{ margin: '9px' }}
                          />
                          {option.name}
                        </label>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </>
            )}
            <Box>
              <Grid container spacing={2}>
                {canCreateUniqueLinks ? (
                  <>
                    <Grid item xs={12}>
                      <Typography style={{ fontWeight: '500', lineHeight: '1' }}>
                        Opciones adicionales
                      </Typography>
                      <Typography variant="caption" style={{ marginBottom: '0.5rem' }}>
                        Para link de uso único
                      </Typography>
                      <Box
                        style={{
                          display: 'flex',
                          alignItems: 'baseline'
                        }}
                      >
                        <Typography display="inline">Duración de vida: </Typography>
                        <FormControl required style={{ marginLeft: '0.5rem' }}>
                          <Select onChange={e => setExpiration(e.target.value)} value={expiration}>
                            {Object.keys(expirationOptions).map(option => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Grid container spacing={1}>
                        <Tippy
                          content="Ten cuidado de generar links con contenido duplicado."
                          placement="right"
                          animation="shift-toward-subtle"
                        >
                          <Grid item>
                            <AdornedButton
                              variant="outlined"
                              onClick={generateUniqueLink}
                              loading={creatingUniqueLink}
                            >
                              Crear link único
                            </AdornedButton>
                          </Grid>
                        </Tippy>
                        <Grid item>
                          <Button
                            variant="text"
                            color="primary"
                            size="large"
                            onClick={generateDynamicLink}
                          >
                            Crear Link dinámico
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <Grid item xs={12}>
                    <Grid container spacing={1}>
                      <Grid item>
                        <Button
                          variant="outlined"
                          color="primary"
                          size="large"
                          onClick={generateDynamicLink}
                        >
                          Crear Link dinámico
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Box>
            <Box
              sx={{
                backgroundColor: 'secondary.main',
                padding: '1rem 1.5rem',
                borderRadius: '6px',
                display: 'flex',
                width: '100%',
                alignItems: 'stretch',
                justifyContent: 'space-between'
              }}
            >
              <Box style={{ paddingRight: '0.5rem' }}>
                <Typography className="dynamic-link-res">{dynamicUrl}</Typography>
              </Box>
              <Box style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton aria-label="copy url" onClick={copyDynamicLinkToClipboard}>
                  <FileCopy fontSize="large" />
                </IconButton>
              </Box>
            </Box>
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="text" color="primary" size="large" onClick={onClose}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DynamicLinkDialog

const Field = ({ question }) => {
  const { type, options } = question
  if (type === 'Select')
    return (
      <Select name={`${question.id}`} variant="outlined" fullWidth>
        {options.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    )

  if (type === 'Checkbox')
    return (
      <FormGroup>
        <Grid spacing={1} container>
          {options.map(option => (
            <Grid item key={option}>
              <FormControlLabel
                value={option}
                sx={{
                  backgroundColor: '#f7f7f7',
                  borderRadius: '6px',
                  padding: '4px 10px 4px 0',
                  marginLeft: '0',
                  '&:hover': {
                    backgroundColor: '#f1f1f1'
                  }
                }}
                control={
                  <Checkbox
                    name={question.id}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'transparent'
                      }
                    }}
                  />
                }
                label={option}
              />
            </Grid>
          ))}
        </Grid>
      </FormGroup>
    )

  if (type === 'RadioButton')
    return (
      <RadioGroup name={question.id}>
        <Grid spacing={1} container>
          {options.map(option => (
            <Grid item key={option}>
              <FormControlLabel
                value={option}
                sx={{
                  backgroundColor: '#f7f7f7',
                  borderRadius: '6px',
                  padding: '4px 10px 4px 0',
                  marginLeft: '0',
                  '&:hover': {
                    backgroundColor: '#f1f1f1'
                  }
                }}
                control={
                  <Radio
                    sx={{
                      '&:hover': {
                        backgroundColor: 'transparent'
                      }
                    }}
                  />
                }
                label={option}
              />
            </Grid>
          ))}
        </Grid>
      </RadioGroup>
    )

  if (type === 'RepeatableGroup') {
    return <TextField name={`${question.id}`} variant="outlined" multiline rows={3} fullWidth />
  }

  return <TextField name={`${question.id}`} variant="outlined" fullWidth />
}
