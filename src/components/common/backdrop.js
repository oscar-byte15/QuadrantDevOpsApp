import React from 'react'
import { Backdrop, CircularProgress } from '@mui/material'
import { useSelector } from 'react-redux'

const CustomBackdrop = () => {
  const backdrop = useSelector(state => state.backdrop)
  return (
    <Backdrop open={backdrop.open} sx={{ zIndex: 'backDrop', color: '#ffffff' }}>
      {backdrop.showLoader && <CircularProgress color="inherit" />}
    </Backdrop>
  )
}

export default CustomBackdrop
