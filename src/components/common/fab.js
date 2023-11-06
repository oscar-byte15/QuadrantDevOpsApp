import React from 'react'
import { Fab } from '@mui/material'
import { Plus as PlusIcon } from 'react-feather'
const CustomFab = ({ children, ...fabProps }) => {
  return (
    <>
      <Fab color="primary" className="fab" sx={{ zIndex: '1050' }} {...fabProps}>
        {children ? children : <PlusIcon />}
      </Fab>
    </>
  )
}
export default CustomFab
