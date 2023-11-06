import React from 'react'
import Button from './button'
import { CircularProgress } from '@mui/material'

const SpinnerAdornment = () => <CircularProgress size={20} className="ml-2" />

const AdornedButton = props => {
  const { children, loading, ...rest } = props
  return (
    <Button {...rest}>
      {children}
      {loading && <SpinnerAdornment />}
    </Button>
  )
}

export default AdornedButton
