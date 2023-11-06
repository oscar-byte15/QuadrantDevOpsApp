import React from 'react'
import { Grid, Box, Typography, Stack } from '@mui/material'

const Indicators = _ => (
  <>
    <Stack direction="row" sx={{ marginTop: '20px' }} spacing={2}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box
          sx={{
            height: '20px',
            width: '20px',
            backgroundColor: '#47bb5c '
          }}
        />
        <Typography variant="body1">Felicitación</Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box
          sx={{
            height: '20px',
            width: '20px',
            backgroundColor: '#ffc814 '
          }}
        />
        <Typography variant="body1">Sugerencia</Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box
          sx={{
            height: '20px',
            width: '20px',
            backgroundColor: '#ff7750 '
          }}
        />
        <Typography variant="body1">Reclamo</Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box
          sx={{
            height: '20px',
            width: '20px',
            backgroundColor: '#6b6b6b'
          }}
        />
        <Typography variant="body1">General</Typography>
      </Stack>
    </Stack>
  </>
)
export default Indicators
