import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import React from 'react'
import { listLanguages } from 'services/web_services/languages'
import TextField from '../common/controlledTextField'
import Dropdown from '../common/controlledDropdown'

const GeneralInfo = () => {
  const [languages, setLanguages] = React.useState([])
  React.useEffect(() => {
    listLanguages().then(res => setLanguages(res.data))
  }, [])

  return (
    <Card variant="outlined" style={{ height: '100%' }}>
      <CardHeader title="Ajustes Globales" subheader="Solo para fines administrativos." />
      <CardContent style={{ paddingTop: '0' }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              name="name"
              type="text"
              autoComplete="off"
              label="Nombre de Encuesta"
              placeholder="Ej. Experiencia en tienda"
            />
          </Grid>
          <Grid item xs={12}>
            {languages.length !== 0 && (
              <Dropdown name="language" label="Seleccionar Idioma" options={languages} />
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
export default GeneralInfo
