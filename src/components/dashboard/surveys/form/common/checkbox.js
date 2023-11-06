import React from 'react'
import { FormControlLabel, Checkbox } from '@mui/material'
import { useController } from 'react-hook-form'

const ControlledCheckbox = ({ name, label, ...props }) => {
  const {
    field: { ref, ...inputProps }
  } = useController({ name })
  return (
    <FormControlLabel
      label={label}
      style={{
        userSelect: 'none'
      }}
      control={<Checkbox {...inputProps} color="primary" {...props} />}
    />
  )
}

export default ControlledCheckbox
