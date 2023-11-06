import React from 'react'
import { TextField, Box, Button } from '@mui/material'
import adminServices from 'services/web_services/admin'

export default function PasswordChangeForm(props) {
  const handleSubmit = e => {
    e.preventDefault()
    const values = Object.fromEntries(new FormData(e.target))
    adminServices
      .changeUserPassword(props.user.id, values.password)
      .then(() => {
        props.onCancelClicked()
      })
      .catch(error => {
        console.error(error)
      })
  }

  const handleCancel = () => {
    props.onCancelClicked()
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="password"
        label="Contraseña"
        type="password"
        placeholder="mínimo caracteres"
        margin="normal"
        fullWidth={true}
        required
        inputProps={{
          minLength: 8
        }}
      />
      <Box display="flex" justifyContent="flex-end" className="form-actions">
        <Button variant="outlined" color="primary" size="large" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button variant="contained" color="primary" size="large" className="ml-1" type="submit">
          Guardar
        </Button>
      </Box>
    </form>
  )
}
