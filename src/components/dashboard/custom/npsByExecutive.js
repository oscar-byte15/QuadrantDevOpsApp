import React, { useState, useEffect } from 'react'
import { Grid, Card, CardContent, CardHeader, Box } from '@mui/material'

import DataGrid from 'components/common/dataGrid'
import NpsDistributionChart from 'components/charts/npsDistribution'
import { getNpsDistributionByAllExecutives } from 'services/web_services/surveysAnswersV2'
import { useSelector } from 'react-redux'
import BodyCard from 'components/common/bodyCard'

const toNpsChart = params => {
  return <NpsDistributionChart series={params.value} />
}

const npsColumns = [
  { field: 'id', hide: true, hideable: false },
  { field: 'name', type: 'string', width: 300, headerName: 'Ejecutivo' },
  { field: 'qty', type: 'number', width: 100, headerName: 'Rptas.' },
  {
    field: 'distribution',
    align: 'center',
    headerName: 'Distribucion',
    sortable: false,
    flex: 1,
    minWidth: 200,
    disableExport: true,
    renderCell: toNpsChart
  },
  { field: 'score', type: 'number', width: 90, headerName: 'Score' }
]

const CustomReport = () => {
  const [data, setData] = useState({ nps: [] })
  const { startDate, endDate, selectedGroups } = useSelector(state => state.filter)

  useEffect(() => {
    const promise = getNpsDistributionByAllExecutives(startDate, endDate, selectedGroups)

    Promise.all([promise]).then(res => {
      setData({ nps: res[0].data })
    })
  }, [startDate, endDate])

  return (
    <BodyCard>
      <CardHeader title="Reporte Ejecutivos" />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardHeader title="NPS por Ejecutivo" />
              <CardContent>
                <Box sx={{ height: '500px' }}>
                  <DataGrid
                    columns={npsColumns}
                    rows={data.nps}
                    rowCount={data.nps.length}
                    disableVirtualization
                    disableColumnResize
                    disableColumnReorder
                    disableColumnMenu
                    initialState={{
                      pinnedColumns: { left: ['name'] },
                      columns: {
                        columnVisibilityModel: {
                          id: false
                        }
                      }
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </BodyCard>
  )
}
export default CustomReport
