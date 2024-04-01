import React, { useEffect, useState } from 'react'

import { Grid, Typography, Card, CardHeader, CardContent, Button } from '@mui/material'
import { GetApp } from '@mui/icons-material'

const ExperienceSection = React.lazy(() => import('./sections/experienceSection'))
import Fab from 'components/common/fab'

import './home.css'
import BodyCard from 'components/common/bodyCard'
import KPISection from './sections/KPISection'

import SummarySection from './sections/summary'

const Home = () => {
 

  

  return (
    <>
      <BodyCard>
        <CardHeader title="Inicio" subheader="Resumen de todos tus indicadores" />
        <Button >getNpsFollowUp</Button>
        <CardContent>
          <Grid container spacing={2}>
         
            <Grid item xs={12}>
              <KPISection type="NPS" />
            </Grid>
            <Grid item xs={12}>
              <KPISection type="CSAT" />
            </Grid>
          </Grid>
        </CardContent>
      </BodyCard>
      <Fab
        variant="extended"
        sx={{ zIndex: 1050, boxShadow: 'none!important' }}
        size="large"
        children={
          <>
            <GetApp style={{ marginRight: '8px' }} />
            <Typography variant="body2">Exportar Excel</Typography>
          </>
        }
      />
    </>
  )
}

export default Home
