import React from 'react'
import { Grid, Typography, TextField, AlertTitle, Alert, Stack, Box } from '@mui/material'
import { Info } from '@mui/icons-material'
//subject 50
//preheader 130
//brandName 40
const Compose = ({ mailData, setMailData }) => (
  <>
    <Alert severity="info">
      <AlertTitle>Instrucciones</AlertTitle>
      <Typography variant="body1" gutterBottom>
        Redacta el contenido de tu correo.
      </Typography>
    </Alert>
    <form noValidate autoComplete="off">
      <Stack spacing={2}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 0.5, sm: 2 }}
          alignItems={'baseline'}
          justifyContent={'flex-start'}
        >
          <Typography sx={{ whiteSpace: 'nowrap', minWidth: '125px' }}>Marca *:</Typography>
          <TextField
            fullWidth
            size="small"
            helperText="Se usará en el remitente del correo 'Marca vía Quadrant'"
            value={mailData.brandName}
            onChange={e => setMailData({ ...mailData, brandName: e.target.value })}
            required
            inputProps={{ maxLength: 40 }}
          />
        </Stack>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 0.5, sm: 2 }}
          alignItems={'baseline'}
          justifyContent={'flex-start'}
        >
          <Typography sx={{ whiteSpace: 'nowrap', minWidth: '125px' }}>Título *:</Typography>
          <TextField
            fullWidth
            helperText="Título del correo"
            autoFocus
            size="small"
            value={mailData.subject}
            onChange={e => setMailData({ ...mailData, subject: e.target.value })}
            required
            inputProps={{ maxLength: 50 }}
          />
        </Stack>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 0.5, sm: 2 }}
          alignItems={'baseline'}
          justifyContent={'flex-start'}
        >
          <Typography sx={{ whiteSpace: 'nowrap', minWidth: '125px' }}>
            Previsualización *:
          </Typography>
          <TextField
            fullWidth
            helperText="Texto visible en algunos clientes de correo"
            size="small"
            value={mailData.preHeader}
            onChange={e => setMailData({ ...mailData, preHeader: e.target.value })}
            required
            inputProps={{ maxLength: 130 }}
          />
        </Stack>
        <Stack direction="column" spacing={2} alignItems={'flex-start'}>
          <Typography sx={{ whiteSpace: 'nowrap' }}>Imagen de correo:</Typography>
          <Box
            sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <Stack
              sx={{
                border: '1px solid #eeeeee',
                borderRadius: '6px',
                padding: '0.2rem 0.8rem'
              }}
            >
              <Box sx={{ width: '100%', height: '400px' }}>
                <img style={{ height: '100%' }} alt="img" src={mailData.image} />
              </Box>
              <TextField
                fullWidth
                label="Direción de imagen"
                size="small"
                variant="filled"
                value={mailData.image}
                helperText="Dimensiones recomendadas: 640 × 834"
                onChange={e => setMailData({ ...mailData, image: e.target.value })}
              />
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </form>
  </>
)
export default Compose
