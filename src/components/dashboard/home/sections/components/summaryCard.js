import React from 'react'
import { Card, CardHeader, CardContent, Typography, Stack, Box } from '@mui/material'

import 'simplebar-react/dist/simplebar.min.css'

const SummaryCard = ({ title, number, label, isScore, diff }) => (
  <Card
    variant="outlined"
    sx={{
      minWidth: { xs: '230px', sm: '120px' }
    }}
  >
    <Stack
      spacing={2}
      direction={{ xs: 'row', sm: 'column' }}
      justifyContent="space-between"
      sx={{
        background:
          isScore == true
            ? number > 0
              ? 'radial-gradient(circle, rgba(71,187,92,1) 0%, rgb(71 187 92 / 0.75) 100%)'
              : number == null
              ? '#fff'
              : 'radial-gradient(circle, rgba(227,88,46,1) 0%, rgba(227 88 46 / 0.75) 100%)'
            : '#ffffff',
        color: isScore == true ? '#ffffff' : '#2d2d2d',
        padding: '1rem'
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontSize: { xs: '1.5rem', sm: '1.25rem' }, lineHeight: 1, whiteSpace: 'nowrap' }}
      >
        {title}
      </Typography>
      <Stack
        direction={{ xs: 'row', sm: 'column' }}
        alignItems={{ xs: 'baseline', sm: 'flex-end' }}
        spacing={{ xs: 0.5, sm: 0 }}
      >
        <Stack direction="row" alignItems="baseline" spacing={0.5}>
          <Typography
            align="right"
            sx={{
              fontWeight: '500',
              fontSize: '2.1rem',
              lineHeight: '0.9'
            }}
          >
            {number}
          </Typography>
          {label ? (
            <Typography component="span" variant="body2" sx={{ lineHeight: '1' }}>
              {label}
            </Typography>
          ) : (
            ''
          )}
        </Stack>
        {diff ? (
          <Typography align="right" variant="body2" sx={{ lineHeight: '1' }}>
            {diff}
          </Typography>
        ) : (
          ''
        )}
      </Stack>
    </Stack>
    {/* <CardContent sx={{ paddingBottom: '16px !important' }}></CardContent> */}
  </Card>
)

export default SummaryCard
