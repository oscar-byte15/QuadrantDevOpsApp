import React from 'react'
import { TextField, Grid } from '@mui/material'

export default function RangeInputSelector(startProps, endProps) {
  // const value = `${startProps.inputProps.value}-${endProps.inputProps.value}`
  // startProps.inputProps.value = value
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField fullWidth label="Inicio" {...startProps}></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Inicio" {...endProps}></TextField>
        </Grid>
      </Grid>
    </>
  )
}
/*    
 *
      <Typography
        variant="body2"
        sx={{
          position: 'relative',
          backgroundColor: 'white',
          zIndex: '1',
          top: '35px',
          left: '10px',
          cursor: 'pointer'
        }}>
      </Typography>
 *
 *
 *    <Typography
        variant="button"
        display="block"
        align="center"
        className="datepickerSelector">
        {startProps.value} - {endProps.value}
      </Typography>
 * */
