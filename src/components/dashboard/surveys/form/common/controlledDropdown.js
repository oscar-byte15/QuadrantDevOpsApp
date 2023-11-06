import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'
import { useController } from 'react-hook-form'

export default function Dropdown({
  name,
  size,
  label,
  options,
  fullWidth,
  helperText,
  variant = 'outlined',
  input,
  deselectLabel,
  margin,
  ...props
}) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error }
  } = useController({ name })

  return (
    <FormControl error={Boolean(error)} variant={variant} fullWidth={fullWidth} margin={margin}>
      <InputLabel htmlFor={name} size={size}>
        {label}
      </InputLabel>
      <Select
        disabled={options.length === 0}
        {...inputProps}
        {...props}
        size={size}
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

Dropdown.defaultProps = {
  variant: 'outlined',
  fullWidth: true,
  margin: 'normal'
}

Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  helperText: PropTypes.string
}
