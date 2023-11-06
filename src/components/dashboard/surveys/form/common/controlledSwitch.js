import React from 'react'
import PropTypes from 'prop-types'
import { FormControlLabel, Switch } from '@mui/material'
import { useController } from 'react-hook-form'

const ControlledSwitch = React.forwardRef((props, ref) => {
  const { label, labelPlacement = 'start', name, labelSmall, ...rest } = props
  const {
    field: { ...inputProps }
  } = useController({ name })

  const MySwitch = (
    <Switch
      color="primary"
      inputProps={{ 'aria-label': 'primary checkbox' }}
      {...inputProps}
      {...rest}
      ref={ref}
      checked={Boolean(inputProps.value)}
    />
  )
  if (!label) return MySwitch
  return (
    <FormControlLabel
      label={label}
      labelPlacement={labelPlacement}
      className={
        labelSmall ? 'FormControlLabel-root-isTitleSmall' : 'FormControlLabel-root-isTitle'
      }
      control={MySwitch}
    />
  )
})

ControlledSwitch.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelSmall: PropTypes.bool
}

export default ControlledSwitch
