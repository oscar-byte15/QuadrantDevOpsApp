import React from 'react'
import { FormControlLabel, Switch } from '@mui/material'

export default ({ label, name, size, labelSmall, field }) => (
  <FormControlLabel
    label={label}
    labelPlacement="start"
    className={labelSmall ? 'FormControlLabel-root-isTitleSmall' : 'FormControlLabel-root-isTitle'}
    control={
      <Switch
        size={size}
        name={name}
        {...field}
        checked={field.value}
        color="primary"
        inputProps={{
          'aria-label': 'primary checkbox'
        }}
      />
    }
  />
)
