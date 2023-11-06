import React from 'react'
import { Button, Dialog } from '@mui/material'

export default function ModalButton({
  variant,
  color,
  size,
  isSubmitting,
  handleOpen,
  handleClose,
  text,
  open,
  children
}) {
  return (
    <>
      <Button
        {...(color && { color })}
        {...(variant && { variant })}
        {...(size && { size })}
        disableElevation
        disabled={isSubmitting}
        onClick={handleOpen}
      >
        {text || 'Agregar'}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        closeAfterTransition
        maxWidth="md"
        fullWidth
        scroll="body"
      >
        {children}
      </Dialog>
    </>
  )
}
