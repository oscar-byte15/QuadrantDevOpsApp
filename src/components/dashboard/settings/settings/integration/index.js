import React from 'react'
import { Card, CardHeader, CardContent, Grid, IconButton, Typography } from '@mui/material'
import { Refresh } from '@mui/icons-material'
import authServices from 'services/web_services/auth'

const TabletIntegration = () => {
  const [authCode, setAuthCode] = React.useState({ code: 'Cargando...' })

  const newAuthCode = () => {
    authServices
      .getMobileAuthCode()
      .then(res => setAuthCode(res.data))
      .catch(_ => alert('hubo un error'))
  }

  React.useEffect(() => {
    newAuthCode()
  }, [])

  return (
    <Card variant="outlined" square>
      <CardHeader
        title="Integración de Tablets"
        subheader="Usa el código de integración para vincular tablets a Quadrant"
      />
      <CardContent>
        <Grid container spacing={1} style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Grid item>
            <Typography
              align="center"
              variant="h5"
              style={{
                backgroundColor: '#dedede',
                display: 'inline-block',
                padding: '0.7rem',
                fontSize: '1.8rem'
              }}
            >
              {authCode.code}
              <IconButton size="small" style={{ marginLeft: '8px' }} onClick={newAuthCode}>
                <Refresh fontSize="small" />
              </IconButton>
            </Typography>
          </Grid>
        </Grid>
        <Typography style={{ display: 'block' }} align="center" variant="caption">
          Este código tiene una duración de 5 minutos
        </Typography>
      </CardContent>
    </Card>
  )
}

export default TabletIntegration
