import {
  TableBody,
  TableRow,
  TableCell,
  Table,
  TableContainer,
  TablePagination,
  TableFooter
} from '@mui/material'
import SimpleRow from '../tables/rows/simpleRow'
import TableHeader from '../tables/headers/sorterHeader'
import React, { useState } from 'react'

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

const rowsPerPage = 5
export default function PaginateTable(props) {
  const { data, columns } = props
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState(null)
  const [page, setPage] = useState(0)

  const handleRequestSort = (event, colSelected) => {
    const isAsc = orderBy === colSelected && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(colSelected)
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)

  const handleChangePage = (event, newPage) => setPage(newPage)

  return (
    <TableContainer>
      <Table size="medium" sx={{ minWidth: '500px' }}>
        <TableHeader
          columns={props.columns}
          order={order}
          onRequestSort={handleRequestSort}
          orderBy={orderBy ? orderBy : columns[0].id}
        />
        <PaginateBody
          page={page}
          rowsPerPage={rowsPerPage}
          emptyRows={emptyRows}
          columns={columns}
          rows={stableSort(data, getComparator(order, orderBy))}
        />
        <TableFooter>
          <TableRow>
            <TablePagination
              count={data.length}
              rowsPerPage={10}
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[]}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

const PaginateBody = props => {
  let { page, rowsPerPage, emptyRows, columns } = props

  let rows =
    rowsPerPage > 0
      ? props.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : props.rows

  return (
    <TableBody>
      {rows.map((row, i) => (
        <SimpleRow key={i + 'xd'} elem={row} columns={columns} />
      ))}
      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  )
}
