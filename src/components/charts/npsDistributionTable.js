import React from 'react'
import DataGrid from 'components/common/dataGrid'
import NpsDistributionChart from 'components/charts/npsDistribution'

const toNpsChart = params => {
  return <NpsDistributionChart series={params.value} />
}

const npsColumns = [
  { field: 'id', hide: true, hideable: false },
  { field: 'name', type: 'string', width: 200, headerName: 'Nombre' },
  { field: 'qty', type: 'number', width: 100, headerName: 'Rptas.' },
  {
    field: 'distribution',
    headerName: 'Distribucion',
    sortable: false,
    flex: 1,
    minWidth: 200,
    renderCell: toNpsChart
  },
  { field: 'score', type: 'number', width: 90, headerName: 'Score' }
]

const CustomReport = ({ data = [], columns = npsColumns }) => {
  return (
    <DataGrid
      columns={columns}
      rows={data}
      hideFooter
      autoHeight
      disableColumnResize
      disableColumnReorder
      disableColumnMenu
      initialState={{
        pinnedColumns: { left: ['name'] },
        sorting: {
          sortModel: [{ field: 'score', sort: 'desc' }]
        }
      }}
    />
  )
}

export default React.memo(CustomReport)
