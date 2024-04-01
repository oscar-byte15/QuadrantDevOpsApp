import React from 'react'
import { Card, CardHeader, CardContent, Link, Stack } from '@mui/material'
import TabletIntegration from './integration/index'
import { useSelector, useDispatch } from 'react-redux'
import { changeBackdropOptions } from 'redux/actions/backdrop/actionDispatcher'
import { newSnackbarMessage } from 'redux/actions/snackbar/actionDispatcher'
import { downloadExcel } from 'services/web_services/surveysAnswers'
import { saveAs } from 'file-saver'
import Users from './users/usersTable'
import CustomConfig from './custom'
import Subdomain from './subdomain'
import Brands from './brands/brandManagement'
import Dateparts from './dayparts/daypartSettings'
const demoId = '5e18dc455579be3ce00001d1'
const santanderId = '5e18d96a5579be3ce0000165'

export default function Settings() {
  const dispatch = useDispatch()

  const handleExcelButton = () => {
    dispatch(changeBackdropOptions({ open: true, showLoader: true }))
    downloadExcel()
      .then(res => {
        dispatch(changeBackdropOptions({ open: false, showLoader: false }))
        saveAs(res, 'QUDRNT_consolidated.xlsx')
      })
      .then(() => {
        dispatch(changeBackdropOptions({ open: false, showLoader: false }))
        dispatch(newSnackbarMessage('Ha ocurrido un error', 'error'))
      })
  }

  //solo para que Adrian testee integracnion
  const quadrantClient = "Santander Consumer"

  return (
    <>
      <Card variant="outlined" square>
        <CardHeader title="Ajustes de Organización" subheader="Administra tu organización" />
        <CardContent>
          <Stack spacing={2}>
            <Dateparts />
            <Brands />
            <Users />
            <Subdomain />
            {quadrantClient === santanderId && <CustomConfig />}
            {quadrantClient === demoId && <TabletIntegration />}
            <Card variant="outlined">
              <CardHeader
                title="Descarga de Datos"
                subheader="Desde acá puedes descargar el historico consolidado de las opiniones capturadas por tu organización"
              />
              <CardContent>
                <Link underline="hover" onClick={handleExcelButton} align="center">
                  Descargar consolidado (.xls)
                </Link>
              </CardContent>
            </Card>
          </Stack>
        </CardContent>
      </Card>
    </>
  )
}
