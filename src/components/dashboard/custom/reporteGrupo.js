import React, { useState, useEffect } from 'react'
import { Grid, Card, CardContent, CardHeader, Box } from '@mui/material'
import DataGrid from 'components/common/dataGrid'
import { useSelector } from 'react-redux'
import NpsDistributionChart from 'components/charts/npsDistribution'
import CsatDistributionChart from 'components/charts/csatDistribution'
import {
  getCsatDistributionByExecutive,
  getNpsDistributionByExecutive
} from 'services/web_services/surveysAnswersV2'
//import httpModule from 'services/httpModule'
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

const CustomReport = props => {
  const slug = props.match.params?.slug
  const [data, setData] = useState({ nps: [], csat: [] })
  const [customConfig, setCustomConfig] = useState({})
  const { startDate, endDate, selectedGroups } = useSelector(state => state.filter)
  const { customRoles, roles } = useSelector(state => state.auth)

  // useEffect(() => {
  //   if (customRoles.includes(slug) || roles.includes('ADMIN')) {
  //     httpModule
  //       .get('/v1/quadrantClient/config/custom')
  //       .then(res => {
  //         const executivesGroupSlug = slug

  //         if (!res?.data?.custom.find(entry => entry.slug === slug)) {
  //           alert('Error, ya no tienes asignado este reporte o ya no existe')
  //           props.history.push('/')
  //         }
  //         const promise1 = getNpsDistributionByExecutive(
  //           startDate,
  //           endDate,
  //           selectedGroups,
  //           executivesGroupSlug
  //         )
  //         const promise2 = getCsatDistributionByExecutive(
  //           startDate,
  //           endDate,
  //           selectedGroups,
  //           executivesGroupSlug
  //         )

  //         Promise.all([promise1, promise2]).then(res => {
  //           setData({ nps: res[0].data, csat: res[1].data })
  //         })
  //         const config = res.data.custom.find(report => report.slug === slug)

  //         setCustomConfig(config)
  //       })
  //       .catch(error => {
  //         console.error({ error })
  //         props.history.push('/')
  //       })
  //   } else {
  //     props.history.push('/')
  //   }
  // }, [startDate, endDate])

  return (
    <BodyCard>
      <CardHeader title={customConfig.title} />
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
