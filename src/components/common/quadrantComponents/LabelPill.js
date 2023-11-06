import React from 'react'
import {
  Stack,
  Chip,
  Typography,
  ListItem,
  ListItemText,
  ListItemIcon,
  List,
  Box,
  Divider,
  Link
} from '@mui/material'

const LabelPill = props => {
  const label = props.label
  const icon = props.icon
  const value = props.value

  return (
    <Stack
      direction="row"
      alignItems={'center'}
      spacing={1}
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
        borderRadius: '6px',
        padding: '6px 10px 8px 10px'
      }}
    >
      {icon}
      <Stack sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        <Typography variant="caption" noWrap sx={{ lineHeight: '1' }}>
          {label}
        </Typography>
        {(() => {
          switch (label) {
            case 'Correo Electrónico':
              return (
                <Link underline="hover" href={'mailto:' + value}>
                  {value}
                </Link>
              )
            case 'Teléfono Celular':
              return (
                <Link underline="hover" href={'tel:' + value}>
                  {value}
                </Link>
              )
            default:
              return <Typography noWrap>{value}</Typography>
          }
        })()}
      </Stack>
    </Stack>
  )
}

export default LabelPill
