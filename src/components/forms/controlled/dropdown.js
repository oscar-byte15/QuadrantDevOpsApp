import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'
import { useController } from 'react-hook-form'

export default function Dropdown({
  name,
  label,
  options,
  fullWidth = true,
  helperText,
  variant = 'outlined',
  input,
  deselectLabel,
  margin = 'normal',
  ...props
}) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error }
  } = useController({ name })

  if (!options?.length) props.value = ''

  return (
    <FormControl error={Boolean(error)} variant={variant} fullWidth={fullWidth} margin={margin}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Select
        disabled={options.length === 0}
        {...inputProps}
        {...props}
        label={label}
        error={Boolean(error)}
        variant={variant}
      >
        {deselectLabel && (
          <MenuItem value="">
            <em>{deselectLabel}</em>
          </MenuItem>
        )}
        {options.map(element => (
          <MenuItem
            key={element.id || element}
            value={element.id !== undefined ? element.id : element}
          >
            {element.name || element}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  )
}

Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  helperText: PropTypes.string
}
