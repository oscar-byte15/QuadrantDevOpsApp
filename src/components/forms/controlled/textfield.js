import React from 'react'
import { TextField } from '@mui/material'
import { useController } from 'react-hook-form'

const ControlledTextField = ({ name, ...props }) => {
  const {
    field: { ref, ...inputProps },
    fieldState: { error }
  } = useController({ name })
  return (
    <TextField
      id={name.replaceAll(' ', '')}
      autoComplete="off"
      {...inputProps}
      inputRef={ref}
      variant="outlined"
      margin="normal"
      fullWidth={true}
      {...props}
      helperText={Boolean(error) && (error.message || error)}
      error={Boolean(error)}
    />
  )
}

export default ControlledTextField
