import React from 'react'
import { Grid, Box, Card, CardContent, Typography, Stack } from '@mui/material'
import TextField from '../../../common/controlledTextField'
import Switch from '../../../common/controlledSwitch'
import { useWatch, useFormContext } from 'react-hook-form'
import useEffectAfterMount from 'hooks/useEffectAfterMount'

export default function followUpCard(props) {
  const question = `${props.path}.question`
  const enabled = `${props.path}.enabled`

  const { setValue } = useFormContext()
  const followUpEnable = useWatch({ name: 'nps.followup.enabled' })
  const questionEnable = useWatch({ name: enabled })
  // const enabled2 = useWatch({ name: `${path}.aboutSelect.enabled` })

  useEffectAfterMount(() => {
    if (followUpEnable != true) setValue(`${props.path}.enabled`, false)
    // if (enabled1 === false) setValue(`${path}.aboutSelect.enabled`, false)
  }, [followUpEnable, enabled, setValue])

  return (
    <Card variant="outlined" square sx={{ width: { xs: '100%', md: 'Calc(100% / 3)' } }}>
      <CardContent>
        <Stack spacing={2}>
          <Switch
            name={enabled}
            disabled={!followUpEnable}
            labelPlacement="end"
            label={props.title}
            size="small"
          />
          <TextField
            fullWidth
            name={question}
            label="Pregunta de seguimiento"
            placeholder="¿En qué fallamos?"
            disabled={!questionEnable}
          />
        </Stack>
      </CardContent>
    </Card>
  )
}
