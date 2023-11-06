import React, { useState, useEffect } from 'react'
import { Grid, Card, CardContent, CardHeader, Box } from '@mui/material'
import DataGrid from 'components/common/dataGrid'
import NpsDistributionChart from 'components/charts/npsDistribution'
import CsatDistributionChart from 'components/charts/csatDistribution'
import {
  getCsatDistributionByExecutive,
  getNpsDistributionByExecutive
} from 'services/web_services/surveysAnswersV2'
import { useSelector } from 'react-redux'
import BodyCard from 'components/common/bodyCard'

const toNpsChart = params => {
  return <NpsDistributionChart series={params.value} />
}

const toCsatChart = params => {
  return <CsatDistributionChart series={params.value} />
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
    renderCell: toNpsChart
  },
  { field: 'score', type: 'number', width: 90, headerName: 'Score' }
]

const csatColumns = [
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
    renderCell: toCsatChart
  },
  { field: 'score', type: 'number', width: 90, headerName: 'Score' }
]

const CustomReport = () => {
  const [data, setData] = useState({ nps: [], csat: [] })
  const { startDate, endDate, selectedGroups } = useSelector(state => state.filter)

  useEffect(() => {
    const promise1 = getNpsDistributionByExecutive(startDate, endDate, selectedGroups)
    const promise2 = getCsatDistributionByExecutive(startDate, endDate, selectedGroups)

    Promise.all([promise1, promise2]).then(res => {
      setData({ nps: res[0].data, csat: res[1].data })
    })
  }, [startDate, endDate, selectedGroups])

  return (
    <BodyCard>
      <CardHeader title="Reporte DERCO" />
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
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardHeader title="CSAT por Ejecutivo" />
              <CardContent>
                <Box sx={{ height: '500px' }}>
                  <DataGrid
                    columns={csatColumns}
                    rows={data.csat}
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
