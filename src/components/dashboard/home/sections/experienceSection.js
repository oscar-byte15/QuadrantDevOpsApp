import { Card, CardContent, CardHeader } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getExperienceByGroup } from 'services/web_services/dashboard'
import DataGrid from 'components/common/dataGrid'

const columns = [
  { field: 'id', hide: true },
  { field: 'group', type: 'string', headerName: 'Puntos de evaluación', width: 280 },
  { field: 'csatScore', type: 'number', headerName: 'CSAT', flex: 1, minWidth: 68 },
  { field: 'npsScore', type: 'number', headerName: 'NPS', flex: 1, minWidth: 68 },
  { field: 'qty', type: 'number', headerName: 'Respuestas', flex: 1.5, minWidth: 100 }
]

const TableChart = () => {
  let filter = useSelector(state => state.filter)

  let [tableData, setTableData] = useState(false)
  useEffect(() => {
    getExperienceByGroup({
      startDate: filter.startDate.startOf('day').toISOString(),
      endDate: filter.endDate.endOf('day').toISOString(),
      evaluationGroups: filter.selectedGroups,
      channel: filter.selectedChannels,
      surveys: filter.selectedSurveys,
      dayparts: filter.selectedDayparts
    }).then(res => {
      setTableData(res.data)
    })
  }, [
    filter.startDate,
    filter.endDate,
    filter.selectedGroups,
    filter.selectedSurveys,
    filter.selectedChannels,
    filter.selectedDayparts
  ])

  return (
    <Card variant="outlined">
      <CardHeader title="Experiencia en números" />
      <CardContent>
        <DataGrid
          initialState={{
            sorting: {
              sortModel: [{ field: 'group', sort: 'asc' }]
            },
            columns: {
              columnVisibilityModel: {
                id: false
              }
            },
            pinnedColumns: { left: ['group'] }
          }}
          disableSelectionOnClick
          disableColumnResize
          disableColumnReorder
          disableColumnSelector
          autoHeight
          hideFooter
          density="compact"
          loading={!tableData}
          columns={columns}
          rows={tableData || []}
          // hideFooter
        />
        {/* </div> */}
      </CardContent>
    </Card>
  )
}

export default TableChart
