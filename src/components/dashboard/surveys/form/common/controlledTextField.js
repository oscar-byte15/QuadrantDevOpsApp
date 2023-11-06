import React from 'react'
import { TextField } from '@mui/material'
import { useController } from 'react-hook-form'
const Input = ({ name, ...props }) => {
  const {
    field: { ref, ...inputProps },
    fieldState: { error }
  } = useController({ name })
  return (
    <TextField
      {...inputProps}
      inputRef={ref}
      variant="outlined"
      margin="normal"
      fullWidth={true}
      {...props}
      helperText={Boolean(error) ? error.message || error : props.help ? props.help : ''}
      error={Boolean(error)}
    />
  )
}

export default Input
