import React from 'react'
import DataGrid from 'components/common/dataGrid'

const columns = [
  { field: 'id', hide: true, hideable: false },
  {
    field: 'value',
    type: 'string',
    headerName: 'Palabra',
    flex: 1
  },
  {
    field: 'type',
    type: 'string',
    headerName: 'Buzón',
    flex: 1,
    renderCell: params => {
      return (
        <span style={{ color: colors[params.row.type], fontWeight: '500' }}>{params.value}</span>
      )
    }
  },
  { field: 'count', type: 'number', headerName: 'Frecuencia', flex: 1 }
]

const colors = {
  Felicitación: '#53DD6C',
  Sugerencia: '#FFB703',
  Reclamo: '#ff7750',
  General: '#6b6b6b'
}

const Resumen = props => {
  const { words } = props

  return (
    <div style={{ height: '500px' }}>
      <DataGrid
        disableColumnResize
        disableColumnReorder
        loading={props.loading}
        columns={columns}
        rows={words || []}
        hideFooter
        initialState={{
          sorting: {
            sortModel: [{ field: 'count', sort: 'desc' }]
          },
          columns: {
            columnVisibilityModel: {
              id: false
            }
          }
        }}
      />
    </div>
  )
}
export default Resumen
