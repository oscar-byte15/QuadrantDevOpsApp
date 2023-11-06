import React from 'react'
import DataGrid from 'components/common/dataGrid'
import CsatDistributionChart from 'components/charts/csatDistribution'

const toCsatChart = params => {
  return <CsatDistributionChart series={params.value} />
}

const csatColumns = [
  { field: 'id', hide: true, hideable: false },
  { field: 'name', type: 'string', width: 200, headerName: 'Nombre' },
  { field: 'qty', type: 'number', width: 100, headerName: 'Rptas.' },
  {
    field: 'distribution',
    headerName: 'Distribución',
    sortable: false,
    flex: 1,
    minWidth: 200,
    renderCell: toCsatChart
  },
  { field: 'score', type: 'number', width: 90, headerName: 'Score' }
]

const CustomReport = ({ data = [], columns = csatColumns }) => {
  return (
    <DataGrid
      autoHeight
      columns={columns}
      rows={data}
      hideFooter
      disableColumnResize
      disableColumnReorder
      disableColumnMenu
      initialState={{
        pinnedColumns: { left: ['name'] },
        sorting: {
          sortModel: [{ field: 'score', sort: 'desc' }]
        },
        columns: {
          columnVisibilityModel: {
            id: false
          }
        }
      }}
    />
  )
}
export default React.memo(CustomReport)
