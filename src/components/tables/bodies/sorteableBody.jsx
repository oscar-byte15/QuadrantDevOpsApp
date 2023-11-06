import React from 'react'
import { TableBody } from '@mui/material'
import _ from 'lodash'
import SimpleRow from '../rows/simpleRow'

export default function SorteableBody(props) {
  const { data, order, orderBy, columns } = props

  return (
    <TableBody>
      {_.orderBy(data, [orderBy], [order]).map(elem => (
        <SimpleRow key={elem.id} elem={elem} columns={columns} />
      ))}
    </TableBody>
  )
}
