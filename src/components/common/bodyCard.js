import React from 'react'
import { Grid, Card } from '@mui/material'

const BodyCard = props => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card square variant="outlined">
          {props.children}
        </Card>
      </Grid>
    </Grid>
  )
}
export default BodyCard
