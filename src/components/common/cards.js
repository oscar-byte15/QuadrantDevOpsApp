import React from 'react'
import { Box, Card, Chip, Typography } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import { Stack } from '@mui/system'

export function ItemCard(props) {
  return (
    <>
      <Card variant="outlined" sx={{ padding: '0.5rem', backgroundColor: 'transparent' }}>
        <Stack>
          <Typography>
            {props.index && props.index + '. '} {props.content}
          </Typography>

          {props.qty && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Chip size="small" icon={<AccountCircle />} label={props.qty} />
            </Box>
          )}
        </Stack>
      </Card>
    </>
  )
}

export function DetailCard(props) {
  return (
    <>
      <Card variant="outlined" sx={{ padding: '0.5rem', backgroundColor: 'transparent' }}>
        <Stack spacing={0.5}>
          {props.icon && props.icon}
          <Typography align="right">
            {props.index && props.index + '. '} {props.content}
          </Typography>

          {props.qty && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Chip size="small" icon={<AccountCircle />} label={props.qty} />
            </Box>
          )}
        </Stack>
      </Card>
    </>
  )
}
