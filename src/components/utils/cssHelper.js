import React from 'react'
import { Box } from '@mui/material'

const CssHelper = () => {
  return (
    <Box className="helper-css">
      <Box display={{ xs: 'block', sm: 'none' }}>xs</Box>
      <Box display={{ xs: 'none', sm: 'block', md: 'none' }}>sm</Box>
      <Box display={{ xs: 'none', md: 'block', lg: 'none' }}>md</Box>
      <Box display={{ xs: 'none', lg: 'block', xl: 'none' }}>lg</Box>
      <Box display={{ xs: 'none', xl: 'block' }}>xl</Box>
    </Box>
  )
}

export default CssHelper
