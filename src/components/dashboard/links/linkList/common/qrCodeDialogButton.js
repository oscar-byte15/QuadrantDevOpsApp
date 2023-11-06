import React, { useEffect, useRef, useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography
} from '@mui/material'
import { Download, QrCode } from '@mui/icons-material'

const QRCodeDialogButton = props => {
  let QRUrl = props.link.row.linkUrl + '?via=CR0C3'
  let Row = props.link.row

  const [open, setOpen] = useState(false)

  const openDialog = () => {
    setOpen(true)
  }

  const closeDialog = () => {
    setOpen(false)
  }

  const getQR = () => {
    const canvas = document.getElementById('qr_' + Row.id)

    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
    let downloadLink = document.createElement('a')
    downloadLink.href = pngUrl
    downloadLink.download = `qr_${Row.evaluationPointName}_${Row.surveyName}.png`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }

  return (
    <>
      <IconButton onClick={() => openDialog()}>
        <QrCode fontSize="small" />
      </IconButton>
      <Dialog open={open} onClose={closeDialog} maxWidth="sm">
        <DialogTitle>{`QR para ${Row.evaluationPointName} - ${Row.surveyName}`} </DialogTitle>
        <DialogContent>
          <Stack justifyContent="center" alignItems="center" spacing={1}>
            <Box sx={{ width: '80%' }}>
              <QRCodeCanvas
                id={'qr_' + Row.id}
                value={QRUrl}
                size={1500}
                style={{ width: '100%', height: '100%' }}
                onContextMenu={e => {
                  if (open) {
                    e.preventDefault()
                  }
                }}
              />
            </Box>
            <Typography
              align="center"
              sx={{
                backgroundColor: '#ededed',
                padding: '2px 1rem',
                borderRadius: '24px',
                userSelect: 'none'
              }}
            >
              {QRUrl}
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button startIcon={<Download />} onClick={getQR}>
            Exportar
          </Button>
          <Button onClick={closeDialog}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default QRCodeDialogButton
