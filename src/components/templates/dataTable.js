import React from 'react'
import { Box } from '@mui/material'
import DataGrid from 'components/common/dataGrid'

const DataTable = props => {
  const { columns, rows, loading, pageCount, currentPage, onChangePage } = props

  return (
    <>
      <Box sx={{ height: '631px' }}>
        <DataGrid {...props} loading={loading} columns={columns} rows={rows} />
      </Box>
    </>
  )
}

export default DataTable
