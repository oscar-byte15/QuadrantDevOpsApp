import React from 'react'
import { Backdrop, Fade, Dialog } from '@mui/material'

/*
 * expected props: one children and DialogMui props
 * */
const Modal = ({ children, ...props }) => {
  return (
    <Dialog
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      closeAfterTransition
      maxWidth="sm"
      fullWidth
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
      {...props}
    >
      <Fade in={props.open}>
        <div>{children}</div>
      </Fade>
    </Dialog>
  )
}

export default Modal
