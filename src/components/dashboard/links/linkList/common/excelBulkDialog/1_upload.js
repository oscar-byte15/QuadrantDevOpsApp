import React from 'react'
import { Grid, Typography, Link, Alert, AlertTitle } from '@mui/material'
import { CloudUpload } from '@mui/icons-material'

const Upload = ({ handleFile, exportFile, mailingServiceStatus }) => {
  return (
    <>
      <Alert severity="info">
        <AlertTitle>Instrucciones</AlertTitle>
        <Typography variant="body1">
          1. <Link onClick={exportFile}>Descarga la plantilla de envío </Link> para que puedas
          llenar los datos de tus participantes de manera sencilla.
        </Typography>
        <Typography variant="body1">
          2. Carga la plantilla llenada con el formato requerido.
        </Typography>
      </Alert>

      {mailingServiceStatus.available && mailingServiceStatus.enabled ? (
        <Grid item xs={12} style={{ textAlign: 'center', marginTop: '2rem' }}>
          {mailingServiceStatus.quota - mailingServiceStatus.used > 0 ? (
            <DragDropFile handleFile={handleFile}>
              <DataInput handleFile={handleFile} />
            </DragDropFile>
          ) : (
            <Alert severity="error">No se cuenta con envíos disponibles.</Alert>
          )}
        </Grid>
      ) : (
        ''
      )}
    </>
  )
}

export default Upload
function DragDropFile({ handleFile, children }) {
  const suppress = e => {
    e.stopPropagation()
    e.preventDefault()
  }
  const handleDrop = e => {
    e.stopPropagation()
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files && files[0]) handleFile(files[0])
  }

  return (
    <div onDrop={handleDrop} onDragEnter={suppress} onDragOver={suppress}>
      {children}
    </div>
  )
}

function DataInput({ handleFile }) {
  const handleChange = e => {
    const files = e.target.files
    const type = files[0].name.split('.')[1]
    if (files && files[0] && typesAccepted.includes(`.${type}`)) handleFile(files[0])
  }

  return (
    <form style={{ border: '3px dashed #585858' }}>
      <div
        className="form-group"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem 1rem'
        }}
      >
        <label
          htmlFor="file"
          style={{ cursor: 'pointer', width: '100%', height: '100%', padding: '1rem' }}
        >
          <CloudUpload fontSize="large" style={{ color: '#2d2d2d' }} />
          <Typography variant="body1">Arrastra o escoje un archivo excel aquí.</Typography>
        </label>
        <br />
        <input
          type="file"
          className="form-control"
          id="file"
          accept={typesAccepted.join(', ')}
          onChange={handleChange}
        />
      </div>
    </form>
  )
}

const typesAccepted = ['.xlsx', '.xls', '.csv']
