import React from 'react'
import { FormControl, Grid, InputLabel, Select, MenuItem, Button } from '@mui/material'
const CommentBoxFilter = _ => {
  return (
    <Grid item xs={12}>
      <Grid container spacing={1} justifyContent="flex-end" alignItems="flex-end">
        <Grid item>
          <FormControl variant="standard">
            <InputLabel>Encuesta</InputLabel>
            <Select label="Encuesta" value={3}>
              <MenuItem value={0}>Todos</MenuItem>
              <MenuItem value={1}>Encuesta de Ventas</MenuItem>
              <MenuItem value={2}>Encuesta de Post-Venta</MenuItem>
              <MenuItem value={3}>Encuesta 12 Meses</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl variant="standard">
            <InputLabel>Grupo</InputLabel>
            <Select label="Grupo" value={3}>
              <MenuItem value={0}>Todos</MenuItem>
              <MenuItem value={1}>Benavides</MenuItem>
              <MenuItem value={2}>Camino Real</MenuItem>
              <MenuItem value={3}>Rambla San Borja</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl variant="standard">
            <InputLabel>Buzón</InputLabel>
            <Select label="Buzón" value={3}>
              <MenuItem value={0}>Todos</MenuItem>
              <MenuItem value={1}>Reclamos</MenuItem>
              <MenuItem value={2}>Sugerencias</MenuItem>
              <MenuItem value={3}>Felicitaciones</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Button variant>Aplicar</Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CommentBoxFilter
