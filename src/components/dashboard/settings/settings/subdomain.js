import React, { useEffect, useState } from 'react'
import { Grid, Card, CardHeader, CardContent, TextField, Button, Stack } from '@mui/material'
import { useDispatch } from 'react-redux'
import { newSnackbarMessage } from 'redux/actions/snackbar/actionDispatcher'
import httpModule from 'services/httpModule'

export default function Settings() {
  const dispatch = useDispatch()
  const [subdomain, setSubdomain] = useState('')
  const [canEdit, setCanEdit] = useState(true)

  useEffect(() => {
    httpModule.get('/v1/quadrantClient/subdomain').then(res => {
      if (res.data.name) {
        setCanEdit(false)
        setSubdomain(res.data.name)
      }
    })
  }, [])

  const handleSaveSubdomain = () => {
    const value = document.getElementById('subdomain').value

    httpModule
      .post('/v1/quadrantClient/subdomain', { subdomain: value })
      .then(() => {
        dispatch(newSnackbarMessage('Se guardó el subdominio con éxito'))
      })
      .catch(err => {
        dispatch(newSnackbarMessage(err?.message || 'Ocurrió un error', 'error'))
      })
  }

  return (
    <Grid item xs={12}>
      <Card variant="outlined">
        <CardHeader title="Subdominio Custom" subheader="El subdominio custom de tus encuestas" />
        <CardContent>
          <Grid container spacing={1} sx={{ justifyContent: 'start', alignItems: 'center' }}>
            <Grid item xs={12}>
              <Stack direction="row" spacing={1}>
                <TextField
                  size="small"
                  id="subdomain"
                  placeholder="miempresa"
                  margin="none"
                  disabled={!canEdit}
                  value={canEdit ? subdomain : `${subdomain}.qudrnt.com`}
                  onChange={e => setSubdomain(`${e.target.value}`)}
                />

                <Button
                  variant="contained"
                  disableElevation
                  disabled={!canEdit}
                  onClick={handleSaveSubdomain}
                >
                  guardar
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}
