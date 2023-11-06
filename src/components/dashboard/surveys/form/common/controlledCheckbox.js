import React from 'react'
import { FormControlLabel, Checkbox } from '@mui/material'
import { useController } from 'react-hook-form'

const ControlledCheckbox = React.forwardRef((props, ref) => {
  const { name, label, ...rest } = props
  const {
    field: { ...inputProps }
  } = useController({ name })

  const CheckBox = (
    <Checkbox
      {...inputProps}
      checked={Boolean(inputProps.value)}
      color="primary"
      {...rest}
      ref={ref}
    />
  )
  if (!label) return CheckBox
  return (
    <FormControlLabel
      ref={ref}
      label={label}
      style={{
        userSelect: 'none'
      }}
      control={CheckBox}
    />
  )
})

export default ControlledCheckbox
