import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ChangePasswordSchema } from './changePasswordSchema'
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Grid,
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CardActions
} from '@mui/material'
import authServices from '../../../../services/web_services/auth'
import './settings.css'
import { useDispatch } from 'react-redux'
import { setSnackbar } from 'redux/actions/snackbar/actionDispatcher'
import { FormContainer, TextFieldElement as TextField } from 'react-hook-form-mui'
import { useForm } from 'react-hook-form'
import useYupValidationResolver from 'hooks/useYupValidationResolver'

const initialValues = {
  oldPassword: '',
  newPassword: '',
  repeatPassword: ''
}

const ChangePasswordForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)
  const formContext = useForm({
    resolver: useYupValidationResolver(ChangePasswordSchema)
    //defaultValues: initialValues
  })

  const submitFromDialog = () => {
    const { oldPassword, newPassword } = formContext.getValues()
    authServices
      .changePassword(oldPassword, newPassword)
      .then(res => {
        history.push('/quadrant/home')
        dispatch(setSnackbar(true, 'Contraseña actualizada'))
      })
      .catch(error => {
        setShowSubmitDialog(false)
        formContext.setError('form', { message: error.message })
      })
  }

  const form = (
    <Card variant="outlined">
      <CardHeader title="Cambiar contraseña" />
      <FormContainer
        handleSubmit={formContext.handleSubmit(() => setShowSubmitDialog(true))}
        formContext={formContext}
      >
        <CardContent>
          <Grid item xs={12}>
            <TextField
              type="password"
              name="oldPassword"
              label="Antigua contraseña"
              variant="outlined"
              margin="normal"
              fullWidth={true}
            />
            <TextField
              type="password"
              name="newPassword"
              label="Nueva contraseña"
              variant="outlined"
              margin="normal"
              fullWidth={true}
            />
            <TextField
              type="password"
              name="repeatPassword"
              label="Repetir nueva contraseña"
              variant="outlined"
              margin="normal"
              fullWidth={true}
            />
            {formContext.formState.errors.form && (
              <FormHelperText error className="text-left">
                {formContext.formState.errors.form.message}
              </FormHelperText>
            )}
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disableElevation
            size="large"
            className="ml-1"
            //disabled={isSubmitting}
          >
            Guardar
          </Button>
        </CardActions>
      </FormContainer>
    </Card>
  )

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card variant="outlined" square>
            <CardHeader title="Ajustes de Cuenta" />
            <CardContent>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  {form}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog
        open={showSubmitDialog}
        onClose={() => {
          setShowSubmitDialog(false)
        }}
      >
        <DialogTitle>Cambio de contraseña</DialogTitle>
        <DialogContent>
          <DialogContentText>¿Estás seguro de cambiar tu contraseña?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowSubmitDialog(false)
            }}
            color="primary"
          >
            Cancelar
          </Button>
          <Button onClick={submitFromDialog} color="primary">
            Si
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ChangePasswordForm
