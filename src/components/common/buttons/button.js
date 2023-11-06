import React from 'react'
import { Button } from '@mui/material'

export default function CustomButton(props) {
  const { children, ...rest } = props
  return (
    <Button variant="contained" color="primary" size="large" {...rest}>
      {children}
    </Button>
  )
}
