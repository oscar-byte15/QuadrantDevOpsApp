import React from 'react'
import { Box } from '@mui/material'
export default function CustomBox(props) {
  const { children, flexProps } = props
  return (
    <Box display="flex" justifyContent="center" alignItems="center" {...flexProps}>
      {children}
    </Box>
  )
}
