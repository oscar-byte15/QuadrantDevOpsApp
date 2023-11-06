import React from 'react'
import commentBoxConfig from '../../../../../constants/commentBox'
import { Box } from '@mui/material'
const CardColor = ({ commentType }) => (
  <Box
    sx={{
      border: '1px solid rgba(0, 0, 0, 0.12)',
      borderBottom: '0',
      width: '100%',
      maxHeight: '7px',
      minHeight: '7px',
      backgroundColor: commentBoxConfig[commentType]?.color || '#c7c7c7'
    }}
  />
)
export default CardColor
