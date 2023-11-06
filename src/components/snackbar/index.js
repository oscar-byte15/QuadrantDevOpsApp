import React, { useCallback } from 'react'
import { X as XIcon } from 'react-feather'
import { Snackbar, IconButton, Alert } from '@mui/material'
import { setSnackbar } from '../../redux/actions/snackbar/actionDispatcher'
import { useDispatch, useSelector } from 'react-redux'

export default function MySnackbar() {
  const { message, show, type } = useSelector(state => state.snackbar)
  const dispatch = useDispatch()
  const handleClose = useCallback(() => dispatch(setSnackbar({ show: false })), [dispatch])

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      open={show}
      autoHideDuration={3000}
      onClose={handleClose}
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={handleClose}>
          <XIcon />
        </IconButton>
      ]}
      sx={{ bottom: { xs: '100px!important', sm: '100px!important' }, right: '25px!important' }}
    >
      <Alert
        severity={type ?? 'info'}
        elevation={0}
        variant="filled"
        sx={{ '&.MuiAlert-filledSuccess': { color: '#2d2d2d' } }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}
