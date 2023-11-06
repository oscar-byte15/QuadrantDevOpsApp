import React from 'react'
import { Avatar, ListItem, ListItemIcon, Stack, Typography } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'

import 'simplebar-react/dist/simplebar.min.css'

const Record = props => {
  const { index, recordType, body, initials, user, createdAt } = props

  return (
    <ListItem
      alignItems="flex-start"
      // secondaryAction={
      //   recordType == 'closing' ? <CheckCircle fontSize="small" sx={{ color: 'green.main' }} /> : ''
      // }
      sx={{ width: '100%' }}
    >
      <ListItemIcon sx={{ minWidth: '32px' }}>
        <Typography align="center" sx={{ width: '21px' }}>{`${index + 1}.`}</Typography>
      </ListItemIcon>
      <Stack sx={{ width: '100%', position: 'relative' }} spacing={1.5}>
        <Typography
          sx={{
            margin: 0,
            lineHeight: '1.5',
            display: 'block',
            letterSpacing: '0.00938em',
            fontSize: '0.9rem',
            whiteSpace: 'pre-wrap',
            borderLeft: '2px solid rgba(0, 0, 0, 0.08)',
            padding: '6px 0px 6px 8px'
          }}
        >
          {body}
        </Typography>
        {recordType == 'closing' ? (
          <CheckCircle
            fontSize="small"
            sx={{
              color: 'green.main',
              marginTop: '7px!important',
              position: 'absolute',
              top: 0,
              right: 0
            }}
          />
        ) : (
          ''
        )}
        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={0.5}>
          <Avatar
            sx={{
              height: 24,
              width: 24,
              fontSize: '1em',
              lineHeight: 0
            }}
            alt={user}
          >
            {initials}
          </Avatar>
          <Typography
            sx={{
              margin: '0',
              fontWeight: '400',
              fontSize: '0.875rem',
              lineHeight: '1',
              letterSpacing: '0.01071em',
              color: 'rgba(0, 0, 0, 0.6)',
              display: 'block'
            }}
          >
            {user} ({createdAt})
          </Typography>
        </Stack>
      </Stack>
    </ListItem>
  )
}
export default Record
