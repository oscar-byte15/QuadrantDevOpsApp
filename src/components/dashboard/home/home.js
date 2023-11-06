import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveAs } from 'file-saver'
import { selectOption } from 'redux/actions/menu/actionDispatcher'
import MENU_OPTIONS from '../../menu/menuSections'
import { Grid, Typography, Card, CardHeader, CardContent, Button } from '@mui/material'
import { GetApp } from '@mui/icons-material'
import { getNpsFollowUp } from 'services/web_services/npsFollowUp'
const ExperienceSection = React.lazy(() => import('./sections/experienceSection'))
import Fab from 'components/common/fab'

import surveyAnswersServices from 'services/web_services/surveysAnswers'
import { changeBackdropOptions } from 'redux/actions/backdrop/actionDispatcher'
import { cleanFilterVisibility, filterInHome } from 'redux/actions/filter/actionDispatcher'
import { newSnackbarMessage } from 'redux/actions/snackbar/actionDispatcher'
import './home.css'
import BodyCard from 'components/common/bodyCard'
import KPISection from './sections/KPISection'
import moment from 'moment'
import SummarySection from './sections/summary'

const Home = () => {
  const dispatch = useDispatch()
  const startDate = useSelector(state => state.filter.startDate)
  const endDate = useSelector(state => state.filter.endDate)
  const auth = useSelector(state => state.auth)

  const { selectedGroups, selectedSurveys } = useSelector(state => state.filter)
  const [page, setPage] = useState(1)
  useEffect(() => {
    document.title = 'Inicio - Dashboard'
    dispatch(selectOption(MENU_OPTIONS.HOME.id))
    dispatch(filterInHome())

    return () => dispatch(cleanFilterVisibility())
  }, [dispatch])

  const handleGetNpsFollowUp = async () => {
    try {
      const npsFollowUpData = await getNpsFollowUp(
        startDate,
        endDate,
        selectedGroups,
        selectedSurveys
      ) // Aquí invocas la función
      console.log('nps follow up data: ', npsFollowUpData)
      // Hacer algo con los datos recibidos, si es necesario.
    } catch (error) {
      // Manejo de errores, si es necesario.
    }
  }

  const downloadExcel = () => {
    dispatch(changeBackdropOptions({ open: true, showLoader: true }))
    surveyAnswersServices
      .downloadExcel(startDate.startOf('day').toISOString(), endDate.endOf('day').toISOString())
      .then(res => {
        dispatch(changeBackdropOptions({ open: false, showLoader: false }))
        dispatch(newSnackbarMessage('Descargado con éxito', 'success'))
        if (res.size) {
          let filename = auth.quadrantClient.name
            .replace(' ', '')
            .replace('á', 'a')
            .replace('é', 'e')
            .replace('í', 'i')
            .replace('ó', 'o')
            .replace('ú', 'u')
          filename = 'QUDRNT_' + filename.replace(/[^a-zA-Z0-9]/g, '') + '_' + Date.now()
          saveAs(res, filename + '.xlsx')
        } else {
          dispatch(newSnackbarMessage('No tienes respuestas'))
        }
      })
      .catch(() => {
        dispatch(changeBackdropOptions({ open: false, showLoader: false }))
        dispatch(newSnackbarMessage('Ha ocurrido un error', 'error'))
      })
  }

  return (
    <>
      <BodyCard>
        <CardHeader title="Inicio" subheader="Resumen de todos tus indicadores" />
        <Button onClick={handleGetNpsFollowUp}>getNpsFollowUp</Button>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <SummarySection />
            </Grid>
            <Grid item xs={12}>
              <KPISection type="NPS" />
            </Grid>
            <Grid item xs={12}>
              <KPISection type="CSAT" />
            </Grid>
            <Grid item xs={12}>
              <ExperienceSection />
            </Grid>
          </Grid>
        </CardContent>
      </BodyCard>
      <Fab
        onClick={downloadExcel}
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
