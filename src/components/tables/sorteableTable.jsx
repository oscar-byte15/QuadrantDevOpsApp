import React, { useState } from 'react'
import TableHeader from './headers/sorterHeader'
import SorteableBody from './bodies/sorteableBody'
import { TableContainer, Table } from '@mui/material'

export default function SorteableTable(props) {
  const { data, columns, stickyHeader, size, maxHeight, padding } = props

  const [order, setOrder] = useState(props.order ? props.order : 'asc')
  const [orderBy, setOrderBy] = useState(props.orderBy ? props.orderBy : null)

  const handleRequestSort = (event, colSelected) => {
    const isAsc = orderBy === colSelected && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(colSelected)
  }

  return (
    <TableContainer style={{ maxHeight: `${maxHeight}` }}>
      <Table stickyHeader={stickyHeader} size={size} padding={padding}>
        <TableHeader
          columns={columns}
          order={order}
          orderBy={orderBy ? orderBy : columns[0].id}
          onRequestSort={handleRequestSort}
        />
        <SorteableBody
          data={data}
          order={order}
          orderBy={orderBy ? orderBy : columns[0].id}
          columns={columns}
        />
      </Table>
    </TableContainer>
  )
}
