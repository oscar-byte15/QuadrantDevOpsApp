import React from 'react'
import { useWatch } from 'react-hook-form'
import Switch from '../common/controlledSwitch'
import Transition from '@mui/material/Collapse'
import { Grid } from '@mui/material'

const Module = ({ name, label, children }) => {
  const enabled = useWatch({ name: `${name}.enabled` })
  return (
    <Grid item xs={12}>
      <Switch name={`${name}.enabled`} label={label} checked={Boolean(enabled)} />
      <Transition in={enabled}>{children}</Transition>
    </Grid>
  )
}

export default React.memo(Module)
