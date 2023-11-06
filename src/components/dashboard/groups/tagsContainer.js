import React from 'react'
import { Stack, Chip, Typography } from '@mui/material'

import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

function TagsContainer({ tags, handleRemoveTag }) {
  if (!tags || !tags.length) return <Typography variant="caption">No hay etiquetas</Typography>
  const handleOnClick = tag => {
    if (handleRemoveTag) {
      handleRemoveTag(tag)
    }
  }
  return (
    <SimpleBar style={{ width: '100%' }}>
      <Stack spacing={1} direction="row" sx={{ padding: '12px 0' }}>
        {tags.map(tag => (
          <Chip
            size="small"
            color="secondary"
            key={tag}
            label={tag}
            {...(handleRemoveTag ? { onDelete: () => handleOnClick(tag) } : {})}
            sx={{ borderRadius: '6px' }}
          />
        ))}
      </Stack>
    </SimpleBar>
  )
}

export default React.memo(TagsContainer)
