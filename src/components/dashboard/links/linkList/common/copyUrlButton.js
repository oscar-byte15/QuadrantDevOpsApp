import { ContentCopy } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newSnackbarMessage } from '../../../../../redux/actions/snackbar/actionDispatcher'

const CopyUrlButton = props => {
  const link = props.link
  const dispatch = useDispatch()

  return (
    <IconButton
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(link)
          dispatch(newSnackbarMessage('Link copiado', 'info'))
        } catch (error) {
          console.error('Failed to copy link URL to clipboard', error)
        }
        // copy params.row.linkUrl to clipboard
      }}
    >
      <ContentCopy fontSize="small" />
    </IconButton>
  )
}

export default CopyUrlButton
