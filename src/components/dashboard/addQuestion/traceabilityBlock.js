import React from 'react'
import {
  Button,
  Box,
  Stack,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Radio,
  Typography,
  Grid,
  Checkbox,
  Card,
  RadioGroup,
  FormGroup,
  IconButton
} from '@mui/material'

import ModalButton from '../../modal/modalButton'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Add, Delete, Edit, Save } from '@mui/icons-material'
import traceabilityFactory from '../surveys/form/modules/traceability/traceabilityFactory'

const AddQuestionSchema = Yup.object().shape({
  question: Yup.string().required('Obligatorio')
})

const InputOptions = [
  { value: 'Title', label: 'Título' },
  { value: 'Text', label: 'Parrafo' },
  { value: 'Normal', label: 'Campo de Texto' },
  { value: 'Select', label: 'Lista desplegable' },
  { value: 'RadioButton', label: 'Selección única' },
  { value: 'Checkbox', label: 'Selección múltiple' },
  { value: 'Break', label: 'Salto de página' },
  { value: 'RepeatableGroup', label: 'Grupo de campos repetible' },
  { value: 'CustomTyC', label: 'Términos custom' }
]

const whithoutQuestion = ['Break']

const AddQuestion = ({
  indexQuestion,
  traceBlock,
  title,
  handleAddQuestion,
  text,
  variant,
  color,
  update
}) => {
  let counterIndex = 0
  const auxOptions =
    traceBlock?.options?.map(option => {
      counterIndex++
      return { id: new Date().getTime() + counterIndex, text: option }
    }) ?? []

  const titleForm = title
  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState(auxOptions ?? [])
  const [newOption, setNewOption] = React.useState('')
  const [optionEditing, setOptionEditing] = React.useState(undefined)
  const [editingText, setEditingText] = React.useState(undefined)
  //  const [block, setBlock] = React.useState({})

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    if (text != 'editar') setOptions([])
  }

  const getOptions = blockType => {
    switch (blockType) {
      case 'Select':
      case 'RadioButton':
      case 'Checkbox':
        return options.map(option => option.text)
      default:
        return []
    }
  }

  const INPUTS = ['Normal', 'Select', 'RadioButton', 'Checkbox']
  const WITH_BODY = ['Title', 'Text', 'CustomTyC']

  const handleSubmit = values => {
    const options = getOptions(values.picked)

    const question = {
      question: values.question,
      type: values.picked,
      inputProps: {},
      enabled: true
    }

    if (options?.length) {
      question.options = options
    }

    if (INPUTS.includes(values.picked)) {
      question.inputProps.required = window.inputRequired?.checked
      question.inputProps.hasIndeterminateOption = window.inputIndeterminateOption?.checked
    }

    if (values.picked === 'Normal') {
      question.inputProps.type = window.inputNumeric?.checked ? 'number' : 'text'
    }

    if (values.picked === 'RepeatableGroup') {
      question.maxRepeat = values.maxRepeat
      question.defaultStruct = values.defaultStruct
    }

    if (WITH_BODY.includes(values.picked)) {
      question.body = values.body
    }

    if (values.picked === 'CustomTyC') {
      question.inputProps.required = window.inputRequired?.checked
    }

    if (text == 'editar') {
      const updatedQuestion = traceabilityFactory(question, values)
      update(indexQuestion, updatedQuestion)
    } else handleAddQuestion(question)

    handleClose()
  }
  function submitOpt(e) {
    e ? e.preventDefault() : ''

    if (newOption === '') return null
    const index = options.find(opt => newOption === opt.text)
    if (index) return null
    const newOpt = {
      id: new Date().getTime(),
      text: newOption
    }
    setOptions([...options].concat(newOpt))
    setNewOption('')
  }

  function deleteOpt(id) {
    let updatedOptions = [...options].filter(opt => opt.id !== id)
    setOptions(updatedOptions)
  }

  function submitEdit(id) {
    const updatedOptions = [...options].map(opt => {
      if (opt.id === id) {
        opt.text = editingText
      }
      return opt
    })
    setOptions(updatedOptions)
    setOptionEditing(null)
  }

  return (
    <ModalButton
      open={open}
      handleClose={handleClose}
      handleOpen={handleOpen}
      variant={variant || 'contained'}
      color={color || 'primary'}
      size="medium"
      text={text}
    >
      <Formik
        initialValues={{
          picked: traceBlock?.type ?? 'Title',
          question: traceBlock?.question ?? '',
          body: traceBlock?.body ?? '',
          defaultStruct: traceBlock?.defaultStruct ?? '',
          maxRepeat: traceBlock?.maxRepeat ?? '',
          required: traceBlock?.inputProps?.required ?? false,
          indeterminateOption: traceBlock?.inputProps?.hasIndeterminateOption ?? false,
          type: traceBlock?.inputProps?.type === 'number' ?? ''
        }}
        validationSchema={AddQuestionSchema}
      >
        {({ values, handleBlur, handleChange }) => {
          return (
            <>
              <DialogTitle>{titleForm}</DialogTitle>

              <DialogContent sx={{ padding: '20px 24px !important', overflow: 'unset' }}>
                <Stack spacing={1}>
                  <Stack
                    direction={{ xs: 'column-reverse', sm: 'row' }}
                    alignItems="flex-end"
                    spacing={1}
                    sx={{ marginBottom: '1rem' }}
                  >
                    <FormControl margin="dense" sx={{ width: { xs: '100%', sm: '30%' } }}>
                      <InputLabel htmlFor="inputTypeSelector">Tipo de bloque</InputLabel>
                      <Select
                        name="picked"
                        label="Tipo de bloque"
                        value={values.picked}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        {InputOptions.map(({ value, label }) => (
                          <MenuItem key={value} value={value}>
                            {label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Card
                      variant="outlined"
                      sx={{
                        pointerEvents: 'none',
                        userSelect: 'none',
                        width: { xs: '100%', sm: '70%' },
                        minHeight: '80px',
                        padding: '35px 25px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative'
                      }}
                    >
                      {BlockExamples[values.picked]}
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'white',
                          backgroundColor: 'black',
                          position: 'absolute',
                          bottom: '0',
                          right: '0',
                          padding: '5px 10px'
                        }}
                      >
                        Ejemplo
                      </Typography>
                    </Card>
                  </Stack>
                  {{
                    Title: (
                      <>
                        <Typography
                          variant="h5"
                          sx={{
                            fontSize: '1.2rem',
                            lineHeight: '1.8',
                            marginTop: '0.5rem',
                            marginBottom: '0.2rem'
                          }}
                        >
                          {' '}
                          Título
                        </Typography>
                        <TextField
                          id="bodyField"
                          name="body"
                          // label="Título"
                          autoComplete="off"
                          autoFocus
                          variant="outlined"
                          fullWidth
                          margin="dense"
                          value={values.body}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                        />
                      </>
                    ),
                    Normal: (
                      <Stack spacing={1}>
                        <Typography
                          variant="h5"
                          sx={{
                            fontSize: '1.2rem',
                            lineHeight: '1.8',
                            marginTop: '0.5rem',
                            marginBottom: '0.2rem'
                          }}
                        >
                          {' '}
                          Pregunta
                        </Typography>
                        <TextField
                          name="question"
                          autoComplete="off"
                          autoFocus
                          variant="outlined"
                          fullWidth
                          margin="dense"
                          value={values.question}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                        />
                        <Typography
                          variant="h5"
                          sx={{
                            fontSize: '1.2rem',
                            lineHeight: '1.8',
                            marginTop: '0.5rem',
                            marginBottom: '0.2rem'
                          }}
                        >
                          {' '}
                          Opciones del bloque
                        </Typography>
                        <Stack direction="row" spacing={1}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                id="inputNumeric"
                                color="primary"
                                checked={values.type}
                                onChange={handleChange('type')}
                              />
                            }
                            label="Sólo números"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                id="inputRequired"
                                color="primary"
                                checked={values.required}
                                onChange={handleChange('required')}
                              />
                            }
                            label="Obligatorio"
                          />
                        </Stack>
                      </Stack>
                    ),
                    Break: (
                      <Box
                        sx={{
                          width: '100%',
                          height: '150px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Typography align="center">Se insertará un salto de página</Typography>
                      </Box>
                    ),
                    Text: (
                      <TextField
                        multiline
                        rows={6}
                        name="body"
                        label="Contenido"
                        autoComplete="off"
                        autoFocus
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        value={values.body}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                    ),
                    RepeatableGroup: (
                      <Stack spacing={1}>
                        <Stack direction="row" spacing={1}>
                          <Typography
                            variant="h5"
                            sx={{ fontSize: '1.2rem', lineHeight: '1.8', marginTop: '0.5rem' }}
                          >
                            {' '}
                            Nombre de Grupo
                          </Typography>
                          <TextField
                            name="question"
                            // label="Nombre de Grupo"
                            autoComplete="off"
                            variant="outlined"
                            fullWidth
                            margin="none"
                            value={values.question}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                          />
                          <Typography
                            variant="h5"
                            sx={{ fontSize: '1.2rem', lineHeight: '1.8', marginTop: '0.5rem' }}
                          >
                            {' '}
                            Repeticiones máximas
                          </Typography>
                          <TextField
                            name="maxRepeat"
                            // label="Max. Rep."
                            type="number"
                            autoComplete="off"
                            variant="outlined"
                            margin="none"
                            value={values.maxRepeat}
                            helperText="Máximo 10"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            inputProps={{ min: '1', max: '10' }}
                            sx={{ width: '230px' }}
                            fullWidth
                          />
                          <Typography
                            variant="h5"
                            sx={{ fontSize: '1.2rem', lineHeight: '1.8', marginTop: '0.5rem' }}
                          >
                            {' '}
                            Extructura Custom
                          </Typography>
                          <TextField
                            fullWidth
                            name="defaultStruct"
                            // label="Estructura custom"
                            autoComplete="off"
                            variant="outlined"
                            margin="none"
                            value={values.defaultStruct}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Stack>
                        {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button size="small" variant="contained" disableElevation>
                              Editar contenido
                            </Button>
                          </Box> */}
                      </Stack>
                    ),
                    CustomTyC: (
                      <Stack spacing={1}>
                        <Typography
                          variant="h5"
                          sx={{
                            fontSize: '1.2rem',
                            lineHeight: '1.8',
                            marginTop: '0.5rem',
                            marginBottom: '0.2rem'
                          }}
                        >
                          {' '}
                          Contenido
                        </Typography>
                        <TextField
                          multiline
                          rows={10}
                          name="body"
                          // label="Contenido"
                          autoComplete="off"
                          autoFocus
                          variant="outlined"
                          fullWidth
                          margin="dense"
                          value={values.body}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                        />
                        <Typography
                          variant="h5"
                          sx={{
                            fontSize: '1.2rem',
                            lineHeight: '1.8',
                            marginTop: '0.5rem',
                            marginBottom: '0.2rem'
                          }}
                        >
                          {' '}
                          Opciones del bloque
                        </Typography>
                        <FormControlLabel
                          control={
                            <Checkbox
                              id="inputRequired"
                              color="primary"
                              checked={values.required}
                              onChange={handleChange('required')}
                            />
                          }
                          label="Obligatorio"
                          title="La aceptación debe ser obligatoria"
                        />
                      </Stack>
                    )
                  }[values.picked] || (
                    <Stack spacing={1}>
                      <Typography
                        variant="h5"
                        sx={{ fontSize: '1.2rem', lineHeight: '1.8', marginTop: '0.5rem' }}
                      >
                        {' '}
                        Pregunta
                      </Typography>
                      {!whithoutQuestion.includes(values.picked) && (
                        <TextField
                          name="question"
                          // label="Pregunta"
                          autoComplete="off"
                          autoFocus
                          variant="outlined"
                          fullWidth
                          margin="dense"
                          value={values.question}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                        />
                      )}
                      <Stack spacing={1}>
                        <Typography
                          variant="h5"
                          sx={{
                            fontSize: '1.2rem',
                            lineHeight: '1.8',
                            marginTop: '0.5rem',
                            marginBottom: '0.2rem'
                          }}
                        >
                          Alternativas
                        </Typography>
                        {options.map(option => (
                          <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="flex-start"
                            alignItems="center"
                            key={option.id}
                          >
                            <Box sx={{ width: '100%' }}>
                              {option.id === optionEditing ? (
                                <TextField
                                  name="question"
                                  fullWidth
                                  autoFocus
                                  margin="none"
                                  variant="standard"
                                  value={editingText}
                                  onChange={e => setEditingText(e.target.value)}
                                  onBlur={handleBlur}
                                  required
                                  onKeyDown={event => {
                                    if (event.key === 'Enter') {
                                      submitEdit(option.id)
                                    }
                                  }}
                                />
                              ) : (
                                <Typography>{option.text}</Typography>
                              )}
                            </Box>
                            <Box sx={{ display: 'flex', gap: '8px' }}>
                              <IconButton onClick={() => deleteOpt(option.id)}>
                                <Delete />
                              </IconButton>
                              {option.id === optionEditing ? (
                                <IconButton onClick={() => submitEdit(option.id)}>
                                  <Save />
                                </IconButton>
                              ) : (
                                <IconButton
                                  onClick={() => {
                                    setOptionEditing(option.id)
                                    setEditingText(option.text)
                                  }}
                                >
                                  <Edit />
                                </IconButton>
                              )}
                            </Box>
                          </Stack>
                        ))}
                      </Stack>
                      <Typography
                        variant="h5"
                        sx={{ fontSize: '1.2rem', lineHeight: '1.8', marginTop: '0.5rem' }}
                      >
                        {' '}
                        Añadir alternativa
                      </Typography>
                      <TextField
                        autoFocus
                        autoComplete="off"
                        name="question"
                        fullWidth
                        margin="none"
                        onChange={e => setNewOption(e.target.value)}
                        value={newOption}
                        onBlur={handleBlur}
                        required
                        onKeyDown={event => {
                          if (event.key === 'Enter') {
                            submitOpt()
                          }
                        }}
                        InputProps={{
                          endAdornment: (
                            <Button type="submit" size="small" onClick={submitOpt} color="primary">
                              Añadir
                            </Button>
                          )
                        }}
                      />
                      <Typography
                        variant="h5"
                        sx={{
                          fontSize: '1.2rem',
                          lineHeight: '1.8',
                          marginTop: '0.5rem',
                          marginBottom: '0.2rem'
                        }}
                      >
                        Opciones del bloque
                      </Typography>
                      <Stack spacing={1} direction="row">
                        <FormControlLabel
                          control={
                            <Checkbox
                              id="inputRequired"
                              color="primary"
                              checked={values.required}
                              onChange={handleChange('required')}
                            />
                          }
                          label={<Typography sx={{ userSelect: 'none' }}>Obligatorio</Typography>}
                        />
                        {values.picked != 'Select' ? (
                          <FormControlLabel
                            control={
                              <Checkbox
                                id="inputIndeterminateOption"
                                color="primary"
                                checked={values.indeterminateOption}
                                onChange={handleChange('indeterminateOption')}
                              />
                            }
                            label={
                              <Typography sx={{ userSelect: 'none' }}>
                                Agregar opción "otros"
                              </Typography>
                            }
                          />
                        ) : (
                          ''
                        )}
                      </Stack>
                    </Stack>
                  )}
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="outlined"
                  color="primary"
                  size="medium"
                  onClick={() => handleSubmit(values)}
                >
                  {text == 'editar' ? 'Guardar' : 'Agregar'}
                </Button>
              </DialogActions>
            </>
          )
        }}
      </Formik>
    </ModalButton>
  )
}

export default AddQuestion

const BlockExamples = {
  Title: (
    <Typography
      variant="h6"
      style={{
        fontWeight: '400',
        color: '#606060',
        fontSize: '1.6rem',
        marginBottom: '0.7rem'
      }}
    >
      Título
    </Typography>
  ),
  Text: (
    <Typography
      variant="body1"
      style={{
        color: '#606060',
        marginBottom: '0.7rem'
        // padding: '0 20px'
      }}
    >
      La información vertida en el presente documento se solicita en cumplimiento de la legislación
      vigente, y su uso es únicamente para fines de control interno.
    </Typography>
  ),
  Normal: (
    <TextField
      fullWidth
      autoComplete="off"
      variant="outlined"
      placeholder="Escribe una respuesta"
    />
  ),
  Select: (
    <FormControl variant="outlined" fullWidth margin="none">
      <InputLabel align="left">Seleccione una</InputLabel>

      <Select label="Seleccione una" native>
        <option value="" />
      </Select>
    </FormControl>
  ),
  RadioButton: (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            style={{
              fontWeight: '400',
              color: '#606060',
              marginBottom: '0.7rem'
            }}
          >
            Selección Única
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <RadioGroup row>
            <Grid container spacing={{ xs: 1.5, sm: 1 }}>
              <Grid item xs={12}>
                <FormControlLabel
                  value="1"
                  style={{ justifyContent: 'flex-start' }}
                  sx={{
                    width: '100%',
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
                      color="primary"
                      checked
                      sx={{
                        '&:hover': {
                          backgroundColor: 'transparent'
                        }
                      }}
                    />
                  }
                  label="Opción 1"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  value="2"
                  style={{ justifyContent: 'flex-start' }}
                  sx={{
                    width: '100%',
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
                      color="primary"
                      sx={{
                        '&:hover': {
                          backgroundColor: 'transparent'
                        }
                      }}
                    />
                  }
                  label="Opción 2"
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </Grid>
      </Grid>
    </>
  ),
  Checkbox: (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            style={{
              fontWeight: '400',
              color: '#606060',
              marginBottom: '0.7rem'
            }}
          >
            Selección múltiple
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormGroup row>
            <Grid container spacing={{ xs: 1.5, sm: 1 }}>
              <Grid item xs={12}>
                <FormControlLabel
                  value="1"
                  style={{ justifyContent: 'flex-start' }}
                  sx={{
                    width: '100%',
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
                      color="primary"
                      checked
                      // name={block.field.name}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'transparent'
                        }
                      }}
                    />
                  }
                  label="Opción 1"
                  className="traceability-formControlLabel"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  value="2"
                  style={{ justifyContent: 'flex-start' }}
                  sx={{
                    width: '100%',
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
                      color="primary"
                      checked
                      // name={block.field.name}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'transparent'
                        }
                      }}
                    />
                  }
                  label="Opción 2"
                  className="traceability-formControlLabel"
                />
              </Grid>
            </Grid>
          </FormGroup>
        </Grid>
      </Grid>
    </>
  ),
  Break: <Typography sx={{ opacity: '0.6' }}>Solo un salto de página</Typography>,
  RepeatableGroup: (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography
          variant="h6"
          style={{
            fontWeight: '400',
            color: '#606060'
          }}
        >
          Nombre
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth variant="filled" margin="none" label="Tipo de Documento" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth variant="filled" margin="none" label="Nro. de Documento" />
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="h6"
          gutterBottom
          style={{
            fontSize: '1.1rem',
            fontWeight: '400',
            color: '#606060'
            // marginBottom: '0.7rem'
          }}
        >
          Seleccione una
        </Typography>
        <RadioGroup row>
          <Grid container spacing={{ xs: 1.5, sm: 1 }}>
            <Grid item xs={12} sm="auto">
              <FormControlLabel
                value="1"
                style={{ justifyContent: 'flex-start' }}
                sx={{
                  backgroundColor: '#f7f7f7',
                  borderRadius: '6px',
                  padding: '0px 10px 0px 0',
                  marginLeft: '0',
                  '&:hover': {
                    backgroundColor: '#f1f1f1'
                  }
                }}
                control={
                  <Radio
                    color="primary"
                    checked
                    sx={{
                      '&:hover': {
                        backgroundColor: 'transparent'
                      }
                    }}
                  />
                }
                label="Sí"
                className="traceability-formControlLabel"
              />
            </Grid>
            <Grid item xs={12} sm="auto">
              <FormControlLabel
                value="2"
                // value={option}
                style={{ justifyContent: 'flex-start' }}
                sx={{
                  backgroundColor: '#f7f7f7',
                  borderRadius: '6px',
                  padding: '0px 10px 0px 0',
                  marginLeft: '0',
                  '&:hover': {
                    backgroundColor: '#f1f1f1'
                  }
                }}
                control={
                  <Radio
                    color="primary"
                    sx={{
                      '&:hover': {
                        backgroundColor: 'transparent'
                      }
                    }}
                  />
                }
                label="No"
              />
            </Grid>
          </Grid>
        </RadioGroup>
      </Grid>

      <Grid item xs={12} sm={12}>
        <Typography
          variant="h6"
          gutterBottom
          style={{
            fontSize: '1.1rem',
            fontWeight: '400',
            color: '#606060'
            // marginBottom: '0.7rem'
          }}
        >
          Seleccione varias
        </Typography>

        <FormGroup row>
          <Grid
            container
            spacing={{ xs: 1.5, sm: 1 }}
            //  justify="center"
          >
            <Grid item xs={12} sm="auto">
              <FormControlLabel
                // value={option}
                style={{ justifyContent: 'flex-start' }}
                sx={{
                  backgroundColor: '#f7f7f7',
                  borderRadius: '6px',
                  padding: '0px 10px 0px 0',
                  marginLeft: '0',
                  '&:hover': {
                    backgroundColor: '#f1f1f1'
                  }
                }}
                control={
                  <Checkbox
                    color="primary"
                    checked
                    sx={{
                      '&:hover': {
                        backgroundColor: 'transparent'
                      }
                    }}
                  />
                }
                label="Opción 1"
              />
            </Grid>
            <Grid item xs={12} sm="auto">
              <FormControlLabel
                style={{ justifyContent: 'flex-start' }}
                sx={{
                  backgroundColor: '#f7f7f7',
                  borderRadius: '6px',
                  padding: '0px 10px 0px 0',
                  marginLeft: '0',
                  '&:hover': {
                    backgroundColor: '#f1f1f1'
                  }
                }}
                control={
                  <Checkbox
                    color="primary"
                    checked
                    sx={{
                      '&:hover': {
                        backgroundColor: 'transparent'
                      }
                    }}
                  />
                }
                label="Opción 2"
              />
            </Grid>
            <Grid item xs={12} sm="auto">
              <FormControlLabel
                // value={option}
                style={{ justifyContent: 'flex-start' }}
                sx={{
                  backgroundColor: '#f7f7f7',
                  borderRadius: '6px',
                  padding: '0px 10px 0px 0',
                  marginLeft: '0',
                  '&:hover': {
                    backgroundColor: '#f1f1f1'
                  }
                }}
                control={
                  <Checkbox
                    color="primary"
                    // name={block.field.name}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'transparent'
                      }
                    }}
                  />
                }
                label="Opción 3"
              />
            </Grid>
          </Grid>
        </FormGroup>
      </Grid>

      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button startIcon={<Add />} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          Añadir
        </Button>
      </Grid>
    </Grid>
  ),
  CustomTyC: (
    <>
      <Grid container spacing={1} justifyContent="flex-start">
        <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            variant="body1"
            align="justify"
            style={{
              color: '#606060',
              marginBottom: '0.7rem'
            }}
          >
            Acá van tus términos legales.
          </Typography>
          <FormControlLabel
            // value={option}
            sx={{ justifyContent: { sx: 'center', sm: 'flex-end' } }}
            control={
              <Checkbox
                color="primary"
                // name={block.field.name}
              />
            }
            label="Acepto estos términos"
            className="traceability-formControlLabel"
          />
        </Grid>
      </Grid>
    </>
  )
}
