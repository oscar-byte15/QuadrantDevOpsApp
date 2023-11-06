import React, { useState } from 'react'
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab'
import { GetApp, Close } from '@material-ui/icons'
import './speedDial.css'
import { useDispatch } from 'react-redux'
import { changeBackdropOptions } from '../../../../redux/actions/backdrop/actionDispatcher'

export default function CustomSpeedDial({ actions }) {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const handleOpen = () => {
    setOpen(true)
    dispatch(changeBackdropOptions({ open: true }))
  }

  const handleClose = () => {
    setOpen(false)
    dispatch(changeBackdropOptions({ open: false }))
  }

  return (
    <SpeedDial
      ariaLabel="SpeedDial"
      sx={{
        zIndex: 'speedDial',
        position: 'absolute',
        bottom: theme => theme.spacing(5),
        right: theme => theme.spacing(5)
      }}
      icon={<SpeedDialIcon icon={<GetApp />} openIcon={<Close />} />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
    >
      {actions.map(action => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          tooltipOpen
          onClick={action.function}
        />
      ))}
    </SpeedDial>
  )
}
