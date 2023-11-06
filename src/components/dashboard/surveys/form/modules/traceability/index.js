import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import {
  Button,
  Grid,
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  TableFooter,
  FormHelperText,
  Card,
  CardHeader,
  Stack,
  CardContent,
  Box,
  Typography,
  Chip
} from '@mui/material'

import AddQuestion from '../../../../addQuestion/traceabilityBlock'
import EditQuestion from '../../../../addQuestion/traceabilityBlock'
import TextField from '../../common/controlledTextField'

const Index = () => {
  const { fields, append, replace, remove, update } = useFieldArray({
    name: 'traceability.questionList',
    keyName: 'key'
  })
  const {
    formState: { errors }
  } = useFormContext()

  const toggleEnabled = index => {
    const newArray = [...fields]
    newArray[index] = { ...newArray[index], enabled: !newArray[index].enabled }
    replace(newArray)
  }

  const questionType = data => {
    switch (data) {
      case 'RadioButton':
        return 'Alternativa única'

      case 'Checkbox':
        return 'Selección multiple'

      case 'Title':
        return 'Título'

      case 'Text':
        return 'Elemento no interactivo'

      case 'Select':
        return 'Bandeja desplegable'

      case 'Normal':
        return 'Campo de texto'

      case 'Break':
        return 'Elemento no interactivo'

      case 'CustomTyC':
        return 'Texto legal'

      case 'RepeatableGroup':
        return 'Grupo Repetible'

      default:
        return 'Campo de trazabilidad'
    }
  }

  const handleDelete = remove

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TextField name="traceability.title" autoComplete="off" label="Título" />
      </Grid>
      <Grid item xs={12}>
        <TextField name="traceability.subtitle" autoComplete="off" label="Subtítulo" />
      </Grid>
      <Grid item xs={12}>
        {fields.length !== 0 && (
          <Stack spacing={1}>
            {fields.map((question, index) => (
              <Card key={index} variant="outlined">
                <CardContent sx={{ padding: '16px!important' }}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    {/* <Box
                      sx={{
                        padding: '0 16px 0 0',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start'
                      }}
                    ></Box> */}
                    <Box sx={{ width: '100%' }}>
                      <CardHeader
                        disableTypography
                        title={
                          <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="flex-start"
                            alignItems="center"
                          >
                            <Typography
                              sx={{ fontWeight: '400', fontSize: '1.3rem', color: 'gray' }}
                            >
                              {index + 1}.
                            </Typography>
                            <Typography sx={{ fontSize: '1.15rem' }}>
                              {question.type == 'CustomTyC'
                                ? 'Términos y condiciones presonalizados'
                                : question.type == 'Break'
                                ? 'Salto de página'
                                : question.type == 'Text'
                                ? 'Párrafo'
                                : question.question == ''
                                ? question.body
                                : question.question}
                            </Typography>
                            <Box
                              sx={{
                                height: '8px',
                                width: '8px',
                                borderRadius: '100%',
                                backgroundColor: question.enabled ? 'success.main' : 'gray'
                              }}
                            />
                          </Stack>
                        }
                        subheader={
                          questionType(question.type) == '' ? null : (
                            <Typography sx={{ opacity: '0.6', fontSize: '0.9rem' }}>
                              {questionType(question.type)}
                            </Typography>
                          )
                        }
                        sx={{ padding: '0 0 16px 0' }}
                      />
                      <Stack spacing={1}>
                        <Box>
                          {(question.type == 'CustomTyC') | (question.type == 'Text') ? (
                            <>
                              <Typography
                                variant="body1"
                                sx={{
                                  opacity: '0.9',
                                  whiteSpace: 'pre-wrap',
                                  padding: '16px',
                                  backgroundColor: 'rgba(0, 0, 0, 0.08)',
                                  borderRadius: '16px'
                                }}
                              >
                                {question.question == '' ? question.body : question.question}
                              </Typography>
                            </>
                          ) : (question.type == 'RadioButton') |
                            (question.type == 'Checkbox') |
                            (question.type == 'Select') ? (
                            <>
                              {question.options[0] && (
                                <>
                                  <Typography gutterBottom>Opciones:</Typography>
                                  <Box>
                                    <Grid container spacing={1}>
                                      {question.options.map((option, index) => (
                                        <Grid item key={index}>
                                          <Chip label={option} />
                                        </Grid>
                                      ))}
                                    </Grid>
                                  </Box>
                                </>
                              )}
                            </>
                          ) : (
                            ''
                          )}
                        </Box>
                      </Stack>
                    </Box>
                    <Box
                      justifyContent="center"
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        flexDirection: 'column'
                      }}
                    >
                      <EditQuestion
                        variant="outlined"
                        text="editar"
                        edit="true"
                        traceBlock={question}
                        indexQuestion={index}
                        title="Editar campo de trazabilidad"
                        fields={fields}
                        replace={replace}
                        update={update}
                      />
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Grid>

      {errors['traceability.questionList'] && (
        <FormHelperText error>{errors['traceability.questionList'].message}</FormHelperText>
      )}
      <Grid item xs={12}>
        <AddQuestion title="Agregar campo de trazabilidad" handleAddQuestion={append} />
      </Grid>
    </Grid>
  )
}

export default Index

const SimpleTable = props => {
  const { columns, rows, handleDelete, toggleEnabled } = props

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow style={{ whiteSpace: 'nowrap' }}>
            {columns.map((col, index) => (
              <TableCell key={index + 'column'} align="center">
                {col}
              </TableCell>
            ))}
            <TableCell align="center"> Acciones </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            const deletable = !Boolean(row.id)
            return (
              <TableRow key={index + 'row'}>
                <TableCell align="center"> {row.question} </TableCell>
                <TableCell align="center"> {row.type}</TableCell>
                <TableCell align="center"> {row.options?.join(', ')} </TableCell>
                <TableCell align="center">
                  {/*<Button>Editar</Button>*/}
                  <Button onClick={() => toggleEnabled(index)}>
                    {row.enabled ? 'Deshabilitar' : 'Habilitar'}
                  </Button>
                  {deletable && <Button onClick={() => handleDelete(index)}>Eliminar</Button>}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
        <TableFooter>
          <TableRow />
        </TableFooter>
      </Table>
    </TableContainer>
  )
}
