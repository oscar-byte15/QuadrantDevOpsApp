import React from 'react'
import {
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment
} from '@mui/material'
import { Translate } from '@mui/icons-material'

import ModalButton from '../../modal/modalButton'

const AddQuestion = ({ question, ...props }) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleSubmit = _ => {
    const this_question = {
      ...question,
      question: document.getElementById('normalQuestion').value,
      translate: document.getElementById('bilingualQuestion').value
    }
    if (this_question.question !== '') {
      props.handleAddQuestion && props.handleAddQuestion(this_question)
      props.handleEdit && props.handleEdit(this_question)
    }
    setOpen(false)
  }

  return (
    <ModalButton
      open={open}
      handleClose={handleClose}
      handleOpen={handleOpen}
      variant={props.variant || 'contained'}
      color="primary"
      text={props.buttonText || 'Agregar campo'}
      size="medium"
    >
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <TextField
          id="normalQuestion"
          autoComplete="off"
          autoFocus
          defaultValue={question?.question || ''}
          name="question"
          label={props.label || 'Pregunta'}
          placeholder={'Ej. ¿Cómo evaluarías la decoración de nuestro establecimiento?'}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          id="bilingualQuestion"
          autoComplete="off"
          defaultValue={question?.translate || ''}
          name="bilinqualQuestion"
          label="Idioma secundario"
          variant="outlined"
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                style={{
                  color: '#6a6a6a'
                }}
              >
                <Translate />
              </InputAdornment>
            )
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" size="large" onClick={() => handleSubmit()}>
          Guardar
        </Button>
      </DialogActions>
    </ModalButton>
  )
}

export default AddQuestion
