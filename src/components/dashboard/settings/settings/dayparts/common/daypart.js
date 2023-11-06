import React, { useEffect, useState } from 'react'
import { Box, IconButton, Stack, TextField } from '@mui/material'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { es } from 'moment/locale/es'
import moment from 'moment'
import { Delete } from '@mui/icons-material'
import { MultiInputTimeRangeField } from '@mui/x-date-pickers-pro'

// Inicializar Moment.js con el idioma adecuado
moment.locale('es')

const Daypart = props => {
  const { id, index, daypartName, range, dayparts, setDayparts, handleDelete, loading } = props

  const [timeRange, setTimeRange] = useState(range ? range : [])
  const [name, setName] = useState(daypartName ? daypartName : '')

  useEffect(() => {
    setDayparts(prevDayparts => {
      const updatedDayparts = [...prevDayparts]
      updatedDayparts[index] = {
        ...updatedDayparts[index],
        name: name,
        startTime: timeRange[0],
        endTime: timeRange[1]
      }
      return updatedDayparts
    })
  }, [timeRange, name])

  return (
    <Stack direction="row" spacing={1} key={index}>
      <Box
        sx={{
          width: { xs: '55%', sm: '40%' },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <TextField
          label="Nombre"
          name="name"
          autoComplete="off"
          autoFocus={id === undefined}
          variant="outlined"
          fullWidth
          margin="none"
          value={name}
          onChange={event => setName(event.target.value)}
          required
        />
      </Box>
      <LocalizationProvider dateAdapter={AdapterMoment} locale={es}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          sx={{ width: { xs: '40%', sm: '55%' } }}
          justifyContent="space-evenly"
        >
          <MultiInputTimeRangeField
            value={timeRange}
            onChange={newValue => setTimeRange(newValue, index)}
            slotProps={{
              textField: ({ position }) => ({
                label: position === 'start' ? 'Inicio' : 'Fin'
              })
            }}
            minTime={dayparts[index - 1] ? dayparts[index - 1].endTime : null}
          />
        </Stack>
      </LocalizationProvider>
      <Box
        sx={{
          width: '5%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Box>
          <IconButton disabled={loading} onClick={() => handleDelete(id, index)}>
            <Delete />
          </IconButton>
        </Box>
      </Box>
    </Stack>
  )
}

export default Daypart
