import React from 'react'
import { useWatch } from 'react-hook-form'
import { Grid } from '@mui/material'
import TextField from '../../common/controlledTextField'
import Switch from '../../common/controlledSwitch'
import Checkbox from '../../common/controlledCheckbox'
const Farewell = () => {
  return (
    <>
      <Grid item xs={12}>
        <TextField name="farewell.message" label="Mensaje de Despedida" />
        <TextField name="farewell.subtitle" label="Subtitulo" />
      </Grid>
      <Grid item xs={12}>
        <Switch name="redirect.enabled" label="Redirección" />
      </Grid>
      <Redirect />
    </>
  )
}

export default Farewell

const Redirect = () => {
  const redirectEnabled = useWatch({ name: 'redirect.enabled' })
  return (
    redirectEnabled && (
      <>
        <TextField name="redirect.text" label="Texto en el botón" />
        <TextField name="redirect.url" label="Url" />
        <Checkbox name="redirect.csatConditional" label="Redirección Inteligente" />
      </>
    )
  )
}
