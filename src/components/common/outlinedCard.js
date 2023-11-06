import React from 'react'
import { Card, CardHeader, CardContent } from '@mui/material'
const OutlinedCard = props => {
  const { title = '', subheader = '', content } = props
  return (
    <Card variant="outlined">
      {title !== '' && subheader !== '' && <CardHeader title={title} subheader={subheader} />}
      <CardContent>{content}</CardContent>
    </Card>
  )
}
export default OutlinedCard
