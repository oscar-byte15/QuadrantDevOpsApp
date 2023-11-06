import React from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Form, TextField } from 'components/forms'
import { saveProduct } from 'services/web_services/rating'

/**
 * Component for survey forms (edit and create)
 * @component
 * @param {object} initialValues
 * @param {string} title
 */
const ProductFormDialog = props => {
  const { initialValues, title, open, setOpen } = props
  const formMethods = useForm({ defaultValues: initialValues })
  const handleClose = () => setOpen(false)
  const handleReset = () => {
    formMethods.clearErrors()
    formMethods.reset()
  }

  function onSubmit(values) {
    saveProduct(values)
      .then(res => {
        setOpen(false)
      })
      .catch(err => {
        formMethods.setError('form', { type: 'server', message: err.message })
      })
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <Form onSubmit={onSubmit} formMethods={formMethods}>
        <DialogTitle>Datos Generales</DialogTitle>
        <DialogContent>
          <TextField label="Nombre" name="name" />
          <TextField label="Descripción" name="description" multiline rows={5} />
          <div>{formMethods.formState.errors.form?.message}</div>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" size="large" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="outlined" color="primary" size="large" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="contained" disableElevation color="primary" type="submit" size="large">
            Guardar
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  )
}
export default ProductFormDialog
