import React from 'react'
import { TableRow, TableCell } from '@mui/material'

export default function ElemRow(props) {
  const { elem, columns } = props

  return (
    <TableRow hover={elem.ON_CLICK ? true : false}>
      {columns.map(col => {
        return (
          <TableCell align={col.align} key={elem.id + col.id} onClick={elem.ON_CLICK}>
            {elem[col.id]}
          </TableCell>
        )
      })}
    </TableRow>
  )
}
