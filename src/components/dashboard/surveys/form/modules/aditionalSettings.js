import {
  Card,
  CardContent,
  CardHeader,
  InputAdornment,
  FormControlLabel,
  Typography,
  Box,
  Switch
} from '@mui/material'
import { useFormContext } from 'react-hook-form'
import Checkbox from '../common/controlledCheckbox'
import Input from '../common/controlledTextField'

import React from 'react'

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-toward-subtle.css'

const GeneralInfo = ({ timer }) => {
  const { setValue } = useFormContext()
  const [timerEnabled, setTimerEnabled] = React.useState(Boolean(timer))

  React.useEffect(() => {
    if (!timerEnabled) setValue('timer', 0)
    //eslint-disable-next-line
  }, [timerEnabled])

  const handleTimerSwitchChange = () => setTimerEnabled(!timerEnabled)

  return (
    <Card variant="outlined" style={{ height: '100%' }}>
      <CardHeader title="Ajustes Adicionales" />
      <CardContent>
        <Typography gutterBottom style={{ fontWeight: '500' }}>
          Opciones Generales
        </Typography>
        <Checkbox name="options.bigFont" label="Mostrar fuentes grandes" />
        <Checkbox name="options.incompleteAnswer.enabled" label="Capturar respuestas incompletas" />
        <Checkbox
          name="options.alternativeProgressBar"
          label="Mostrar indicador de progreso alternativo"
        />
        <Typography gutterBottom style={{ fontWeight: '500' }}>
          Opciones para tablet
        </Typography>

        <FormControlLabel
          control={
            <Tippy
              content="Activar timer en tablet"
              placement="bottom"
              animation="shift-toward-subtle"
            >
              <Switch
                checked={timerEnabled}
                color="secondary"
                size="small"
                onChange={handleTimerSwitchChange}
              />
            </Tippy>
          }
          label={
            <Box style={{ display: 'flex', alignItems: 'baseline' }}>
              <Typography display="inline" style={{ marginRight: '8px' }}>
                Timer por
              </Typography>
              <Input
                disabled={!timerEnabled}
                name="options.timer"
                type="Number"
                variant="standard"
                margin="none"
                inputProps={{ max: '30' }}
                style={{ width: '70px' }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">seg.</InputAdornment>
                }}
              />
            </Box>
          }
        />
      </CardContent>
    </Card>
  )
}
export default GeneralInfo
