import React, { useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import {
  Grid,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  Paper,
  Stack,
  Button,
  Select,
  MenuItem,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel
} from '@mui/material'
import TextField from '../../common/controlledTextField'
import Checkbox from '../../common/controlledCheckbox'
import Switch from '../../common/controlledSwitch'
import { getDefaultContactFields } from 'services/web_services/contactFields'
import AddQuestion from 'components/dashboard/addQuestion/addQuestion'
import QuestionCard from './questionCard'
import CommentBoxModule from '../commentBox'
import Module from '../module'
import ModalButton from 'components/modal/modalButton'

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-toward-subtle.css'

const ContactModule = () => {
  const {
    fields,
    append,
    remove: removeQuestion,
    update: updateQuestion
  } = useFieldArray({ name: 'contact.questionList', keyName: 'key' })
  const { fields: contactFields, append: appendContactField } = useFieldArray({
    name: 'contact.contactFields',
    keyName: 'key'
  })
  const [allContactFields, setAllContactFields] = useState([])

  const handleAddContactField = cf => appendContactField(cf)
  React.useEffect(() => {
    getDefaultContactFields().then(res => {
      res.data = res.data.map(contactField => {
        let cf = {
          contactField: contactField,
          requiredFor: {
            Felicitación: false,
            Sugerencia: false,
            Reclamo: true
          },
          enabled: true,
          visibleForDynamic: false
        }
        return cf
      })
      setAllContactFields(res.data)

      res.data = res.data.filter(({ contactField }) => contactField.type !== 'UNDEFINED')
      if (contactFields.length < res.data.length) {
        res.data = res.data.slice(contactFields.length)
        res.data.forEach(appendContactField)
      }
    })
    //eslint-disable-next-line
  }, [])
  return (
    <Grid container spacing={1}>
      <TextField
        name="contact.title"
        label="Título de la sección"
        placeholder="Ej. Mantengamos el contacto"
      />
      <TextField
        name="contact.subtitle"
        label="Subtítulo de la sección"
        placeholder="Ej. Mantengamos el contacto"
      />
      <Grid item xs={12}>
        <Typography variant="h6" style={{ color: '#2d2d2de8', fontWeight: '400' }}>
          Campos Homologados
        </Typography>
        <Typography variant="body1" style={{ color: '#0000008a' }}>
          Campos disponibles para validación
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {/*
        <Grid container spacing={1}>
          {contactFields.map((contactField, index) => (
            <Grid item xs={12} md={6} key={'cf' + index}>
              <SignCard contactField={contactField} index={index} />
            </Grid>
          ))}
        </Grid>
          */}
        <Grid item xs={12} sx={{ marginTop: '1rem' }}>
          <TableContainer variant="outlined" component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="center" colSpan={3}>
                    Obligatoriedad
                  </TableCell>
                  <TableCell
                    align="center"
                    colSpan={2}
                    sx={{ borderLeft: '1px solid rgba(224, 224, 224, 1)' }}
                  >
                    Opciones
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Campo</TableCell>
                  <TableCell align="center">Felicitaciones</TableCell>
                  <TableCell align="center">Sugerencias</TableCell>
                  <TableCell align="center">Reclamos</TableCell>
                  <TableCell align="center" sx={{ borderLeft: '1px solid rgba(224, 224, 224, 1)' }}>
                    Interfaz Web
                  </TableCell>
                  <TableCell align="center">Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contactFields.map(({ contactField }, index) => {
                  const path = `contact.contactFields[${index}]`
                  return (
                    <TableRow key={contactField.id}>
                      <TableCell component="th" scope="row">
                        {contactField.question}
                      </TableCell>
                      <TableCell align="center">
                        <Checkbox name={`${path}.requiredFor.Felicitación`} />
                      </TableCell>
                      <TableCell align="center">
                        <Checkbox name={`${path}.requiredFor.Sugerencia`} />
                      </TableCell>
                      <TableCell align="center">
                        <Checkbox name={`${path}.requiredFor.Reclamo`} />
                      </TableCell>
                      <TableCell align="center">
                        <Tippy
                          content="Activa o desactiva el campo en la interfaz de link dinámico"
                          placement="bottom-start"
                          animation="shift-toward-subtle"
                        >
                          <Switch name={`${path}.visibleForDynamic`} size="small" />
                        </Tippy>
                      </TableCell>
                      <TableCell align="center">
                        <Tippy
                          content="Activa o desactiva el campo en la encuesta"
                          placement="bottom-start"
                          animation="shift-toward-subtle"
                        >
                          <Switch name={`${path}.enabled`} color="secondary" size="small" />
                        </Tippy>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell sx={{ border: '0', padding: '12px 16px' }} colSpan={6}>
                    <Stack direction="row" justifyContent="flex-end" sx={{ width: '100%' }}>
                      <AddContactField
                        addContactField={handleAddContactField}
                        contactFields={allContactFields}
                        excludedContactFields={contactFields}
                      />
                    </Stack>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" style={{ color: '#2d2d2de8', fontWeight: '400' }}>
          Campos Personalizados
        </Typography>
        <Typography variant="body1" style={{ color: '#0000008a' }}>
          Campos personalizables sin opción de validación
        </Typography>
      </Grid>
      <Grid container spacing={1} item xs={12}>
        {fields.map((question, index) => (
          <Grid item xs={12} sm={6} md={4} key={question.key}>
            <QuestionCard
              question={question}
              index={index}
              handleDiscard={removeQuestion}
              handleEdit={updateQuestion}
            />
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12}>
        <AddQuestion
          title="Agregar campo de contacto"
          label="Campo"
          handleAddQuestion={append}
          helperText=""
        />
      </Grid>
      <Module label="Política de Privacidad" name="contact.tyc">
        <TextField
          name="contact.tyc.tyc"
          label="Política de Privacidad"
          multiline
          rows="16"
          helper="Se mostrará en una ventana emergente"
        />
      </Module>
      <Grid item xs={12}>
        <TextField
          name="contact.drawTyC"
          label="Preview Bases del sorteo"
          multiline
          rows="5"
          helper="Se mostrará en una ventana emergente"
          disabled
        />
      </Grid>

      <Module label="Buzón de comentarios" name="commentBox">
        <CommentBoxModule />
      </Module>
    </Grid>
  )
}

export default ContactModule
const AddContactField = ({ contactFields, excludedContactFields, addContactField }) => {
  const excludedIds = excludedContactFields.map(({ contactField }) => contactField.id)
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleSubmit = _ => {
    if (!value) return
    setOpen(false)
    addContactField(value)
  }

  return (
    <ModalButton
      open={open}
      handleClose={handleClose}
      handleOpen={handleOpen}
      variant={'contained'}
      color="primary"
      text={'AGREGAR'}
      size="medium"
    >
      <DialogTitle>Elegir campo</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel htmlFor="contactField">Campo: </InputLabel>
          <Select id="contactField" onChange={e => setValue(e.target.value)} value={value.question}>
            {contactFields
              .filter(cf => !excludedIds.includes(cf.contactField.id))
              .map(entry => {
                return (
                  <MenuItem value={entry} key={entry.contactField.id}>
                    {entry.contactField.question}
                  </MenuItem>
                )
              })}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button color="primary" size="large" onClick={() => handleSubmit()}>
          Agregar
        </Button>
      </DialogActions>
    </ModalButton>
  )
}
