import React from 'react'
import Box from './box'
const CenteredMessage = props => {
  const { text = 'No se encontraron respuestas', height = '150px' } = props
  return (
    <Box flexProps={{ height }}>
      <h3>{text}</h3>
    </Box>
  )
}
export default CenteredMessage
