import React, { useState } from 'react'
import { Grid, Typography, Alert, Button, Stack, AlertTitle, Box } from '@mui/material'
import DataGrid from 'components/common/dataGrid'
import { AutoAwesome } from '@mui/icons-material'
import UniqueLinksDialog from './excelGenerate/excelGenerate'

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-toward-subtle.css'

const Verification = ({
  data,
  setIsNextButtonDisabled,
  participantsData,
  contact,
  surveySlug,
  uniqueLinksServiceStatus
}) => {
  const [open, setOpen] = useState(false)

  const dataCopy = JSON.parse(JSON.stringify(data))
  const cols = dataCopy.shift()

  const renderer = params => {
    switch (params.field) {
      default:
        return (
          <Typography sx={{ fontSize: '0.875rem', lineHeight: '1.43', letterSpacing: '0.01071em' }}>
            {params.value}
          </Typography>
        )
    }
  }

  const columns = cols.map(e => {
    let obj = {
      headerName: e,
      field: e.toLowerCase().replace(/\s/g, ''),
      flex: e == 'Correo Electrónico' ? '1' : '',
      type: e == 'Teléfono Celular' ? 'number' : 'string',
      width: e.length * 10,
      minWidth: e.length * 10,
      renderCell: renderer
    }
    return obj
  })
  const handleOpenDialog = () => {
    setOpen(true)
  }

  const uniqueEmails = new Set()
  const duplicateEmails = []
  const rows = dataCopy
    .filter(row => {
      const email = row[0]
      if (uniqueEmails.has(email)) {
        duplicateEmails.push(email)
        return false
      }
      uniqueEmails.add(email)
      return true
    })
    .map((row, index) => {
      let obj = { id: index }
      cols.forEach((col, colIndex) => {
        obj[col.toLowerCase().replace(/\s/g, '')] = row[colIndex]
      })
      return obj
    })
  const firstEmailDuplicated = Array.from(duplicateEmails).slice(0, 1)
  const secondEmailDuplicated = Array.from(duplicateEmails).slice(1, 2)
  const thirdEmailDuplicated = Array.from(duplicateEmails).slice(2, 3)
  if (duplicateEmails.length > 0) {
    setIsNextButtonDisabled(true)
  }

  const uniqueLinksEnabled = Boolean((uniqueLinksServiceStatus.enabled = true))
  const enoughUniqueLinks = Boolean(uniqueLinksServiceStatus.available >= rows.length)
  return (
    <>
      <Alert severity="info">
        <AlertTitle>Instrucciones</AlertTitle>
        <Typography gutterBottom>
          Comprueba que la información del las cabeceras y sus respectivas columnas sean correctas.
        </Typography>
      </Alert>

      {duplicateEmails.length <= 0 ? (
        <Box sx={{ height: '500px' }}>
          <DataGrid
            // autoHeight
            columns={columns}
            rows={rows}
            disableColumnMenu
            disableColumnSelector
            disableSelectionOnClick
            hideFooterPagination
          />
        </Box>
      ) : duplicateEmails.length <= 3 ? (
        <Alert severity="error">
          <strong>{`Se han detectado ${duplicateEmails.length} duplicados. Por favor, verificar los correos: ${firstEmailDuplicated}, ${secondEmailDuplicated}, ${thirdEmailDuplicated}`}</strong>
        </Alert>
      ) : (
        <Alert severity="error">
          <strong>{`Se han detectado ${
            duplicateEmails.length
          } duplicados. Por favor, verificar los correos: ${firstEmailDuplicated}, ${secondEmailDuplicated}, ${thirdEmailDuplicated} y ${
            duplicateEmails.length - 3
          } más`}</strong>
        </Alert>
      )}
      <Stack direction="row" justifyContent="flex-end">
        <Tippy
          disabled={uniqueLinksEnabled && enoughUniqueLinks}
          content={
            !uniqueLinksEnabled
              ? `No cuentas con el servicio de links únicos`
              : !enoughUniqueLinks
              ? `No cuentas con suficientes links únicos. Necesitas ${rows.length} y tienes ${uniqueLinksServiceStatus.available}.`
              : ''
          }
          placement="top-end"
          animation="shift-toward-subtle"
        >
          <Box>
            <Button
              onClick={handleOpenDialog}
              variant="outlined"
              disabled={!uniqueLinksEnabled || !enoughUniqueLinks}
              startIcon={<AutoAwesome />}
            >
              Generar Links Únicos
            </Button>
          </Box>
        </Tippy>
      </Stack>
      {rows && (
        <UniqueLinksDialog
          open={open}
          setOpen={setOpen}
          rows={rows}
          participantsData={participantsData}
          contact={contact}
          surveySlug={surveySlug}
        />
      )}
    </>
  )
}
export default Verification
