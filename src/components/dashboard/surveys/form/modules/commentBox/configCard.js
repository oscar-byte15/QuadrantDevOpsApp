import React from 'react'
import { Grid, Box, Card, CardContent, Typography, Stack } from '@mui/material'
import TextField from '../../common/controlledTextField'
import Switch from '../../common/controlledSwitch'
import { useWatch, useFormContext } from 'react-hook-form'
import useEffectAfterMount from 'hooks/useEffectAfterMount'

export default function ConfigCard({ config }) {
  const { backgroundColor, title, subtitle, fieldPlaceholder, path } = config
  const { setValue } = useFormContext()
  const enabled1 = useWatch({ name: `${path}.enabled` })
  const enabled2 = useWatch({ name: `${path}.aboutSelect.enabled` })

  useEffectAfterMount(() => {
    if (enabled1 === true) setValue('commentBox.defaultEnabled', false)
    if (enabled2 === false) setValue(`${path}.aboutSelect.enabled`, false)
    if (enabled1 === false) setValue(`${path}.aboutSelect.enabled`, false)
  }, [enabled1, setValue])

  return (
    <Grid item xs={12} md={4}>
      <Card variant="outlined" square>
        <Box display="flex">
          <Box
            style={{
              maxWidth: '7px',
              minWidth: '7px',
              backgroundColor
            }}
          />
          <Box flexGrow={1}>
            <CardContent>
              <Stack spacing={2}>
                <Box>
                  <Switch label={title} name={`${path}.enabled`} size="small" />
                  <Typography
                    variant="body1"
                    style={{
                      color: '#0000008a'
                    }}
                  >
                    {subtitle}
                  </Typography>
                  <TextField
                    disabled={!enabled1}
                    name={`${path}.question`}
                    label="Título de Buzón"
                    placeholder={fieldPlaceholder}
                  />
                </Box>
                <Box>
                  <Switch
                    label="Preguntar motivo"
                    name={`${path}.aboutSelect.enabled`}
                    size="small"
                    disabled={!enabled1}
                  />
                  <Typography
                    variant="body1"
                    style={{
                      color: '#0000008a'
                    }}
                  >
                    Será obligatorio para tus participantes
                  </Typography>
                  <TextField
                    disabled={!enabled2}
                    name={`${path}.aboutSelect.options`}
                    label="Opciones"
                    placeholder="Atención al cliente, Tiempo de espera, Calidad de producto, Delivery, Amabilidad, Otro"
                    multiline
                    rows={3}
                    help="Separa las opciones con una coma"
                  />
                </Box>
              </Stack>
            </CardContent>
          </Box>
        </Box>
      </Card>
    </Grid>
  )
}
