import React, { useEffect, useState } from 'react'
import { listUniqueLinks } from 'services/web_services/links'
import { DataGridPro, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid-pro'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Card, CardHeader, CardContent, Box, Stack, Typography } from '@mui/material'
import DataGrid from 'components/common/dataGrid'
import {
  cleanFilterVisibility,
  filterInUniqueLinksList
} from 'redux/actions/filter/actionDispatcher'

const renderAnswered = params => <span>{params.value ? '✔️' : ''} </span>

const dateFormatter = params => {
  const date = new Date(params.value)

  return date.toLocaleString().replace(',', '')
}

const columns = [
  { field: 'id', hideable: 'false' },
  { field: 'survey', type: 'string', width: 180, headerName: 'Encuesta' },
  { field: 'evaluationGroup', type: 'string', width: 120, headerName: 'Punto' },
  {
    field: 'createdAt',
    type: 'dateTime',
    width: 160,
    headerName: 'Creado',
    valueFormatter: dateFormatter
  },
  {
    field: 'expiration',
    type: 'dateTime',
    width: 160,
    headerName: 'Expira',
    valueFormatter: dateFormatter
  },
  { field: 'shortUrl', sortable: false, minWidth: 200, flex: 1, headerName: 'Link' },
  {
    field: 'answered',
    sortable: false,
    width: 80,
    headerName: 'Respuesta',
    align: 'center',
    headerAlign: 'center',
    renderCell: renderAnswered
  }
]

const renderResponseRate = params => <span>{params.value.toFixed(2)}%</span>

const summaryColumnsPoints = [
  { field: 'id' },
  { field: 'name', type: 'string', flex: 1, headerName: 'Punto de Evaluación' },
  { field: 'total', type: 'number', width: 80, headerName: 'Total' },
  {
    field: 'responseRate',
    type: 'number',
    width: 100,
    headerName: 'TR(%)',
    renderCell: renderResponseRate
  }
]

const summaryColumnsSurveys = [
  { field: 'id' },
  { field: 'name', type: 'string', flex: 1, headerName: 'Encuesta' },
  { field: 'total', type: 'number', width: 80, headerName: 'Total' },
  {
    field: 'responseRate',
    type: 'number',
    width: 100,
    headerName: 'TR(%)',
    renderCell: renderResponseRate
  }
]

function getSummary(uniqueLinks) {
  const summary = {
    loading: false,
    general: {
      total: 0,
      answered: 0
    },
    byGroup: {},
    bySurvey: {}
  }

  uniqueLinks.forEach(link => {
    const { answered, survey, evaluationGroup } = link
    summary.general.total++
    if (summary.byGroup[evaluationGroup.id]) {
      summary.byGroup[evaluationGroup.id].total++
    } else {
      summary.byGroup[evaluationGroup.id] = {
        id: evaluationGroup.id,
        name: evaluationGroup.name,
        total: 1,
        answered: 0
      }
    }

    if (summary.bySurvey[survey.id]) {
      summary.bySurvey[survey.id].total++
    } else {
      summary.bySurvey[survey.id] = {
        id: survey.id,
        name: survey.name,
        total: 1,
        answered: 0
      }
    }

    if (answered) {
      summary.bySurvey[survey.id].answered++
      summary.byGroup[evaluationGroup.id].answered++
      summary.general.answered++
    }
  })

  Object.values(summary.byGroup).forEach(
    ({ id, name, total, answered }) =>
      (summary.byGroup[id] = { id, name, total, responseRate: 100 * (answered / total).toFixed(2) })
  )
  Object.values(summary.bySurvey).forEach(
    ({ id, name, total, answered }) =>
      (summary.bySurvey[id] = {
        id,
        name,
        total,
        responseRate: 100 * (answered / total).toFixed(2)
      })
  )

  return summary
}

const UniqueLinks = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)
  const [showLoader, setShowLoader] = useState(true)
  const [uniqueLinks, setUniqueLinks] = useState([])
  const [summary, setSummary] = useState({
    loading: true,
    general: { total: 0, answered: 0 },
    bySurvey: {},
    byGroup: {}
  })

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport
          csvOptions={{
            fileName: 'UnqLinksExport_' + Date.now(),
            delimiter: ';',
            utf8WithBom: true
          }}
        />
      </GridToolbarContainer>
    )
  }

  useEffect(() => {
    dispatch(filterInUniqueLinksList())
    return () => dispatch(cleanFilterVisibility())
  }, [dispatch])

  useEffect(() => {
    const setLinks = async () => {
      const surveyUrl = process.env.REACT_APP_SURVEYS_URL
      let links = await listUniqueLinks({
        //options: { limit: 500 },
        startDate: filter.startDate.startOf('day'),
        endDate: filter.endDate.endOf('day'),
        surveys: filter.selectedSurveys,
        evaluationGroups: filter.selectedGroups
      })
      setSummary(getSummary(links.data.docs))
      links = links.data.docs.map(link => {
        const shortUrl = `${surveyUrl}a/${link.shortUrl}`
        return {
          id: shortUrl,
          shortUrl: shortUrl,
          slug: link.slug,
          createdAt: link.createdAt,
          expiration: link.expiration,
          answered: link.answered,
          survey: link.survey?.name,
          evaluationGroup: link.evaluationGroup?.name
        }
      })
      setShowLoader(false)
      setUniqueLinks(links)
    }

    setShowLoader(true)
    setLinks()
  }, [filter.startDate, filter.endDate, filter.selectedGroups, filter.selectedSurveys])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card square className="report-card">
          <CardHeader title="Links únicos" />

          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardHeader title="Estadisticas generales" />
                  <CardContent>
                    <Box sx={{ overflow: 'auto', width: '100%' }}>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ width: 'fit-content', padding: '10px 0' }}
                      >
                        <Card variant="outlined" sx={{ minWidth: '120px' }}>
                          <CardHeader
                            disableTypography
                            title={
                              <Typography variant="h6" noWrap sx={{ lineHeight: 1 }}>
                                Links Generados
                              </Typography>
                            }
                            sx={{ paddingBottom: '8px', display: 'block' }}
                          />
                          <CardContent sx={{ paddingBottom: '16px !important' }}>
                            <Typography
                              align="right"
                              sx={{
                                fontWeight: '500',
                                fontSize: '2.1rem',
                                lineHeight: '0.9'
                              }}
                            >
                              {summary.general.total.toLocaleString(undefined, {
                                maximumFractionDigits: 2
                              })}
                            </Typography>
                          </CardContent>
                        </Card>
                        <Card variant="outlined" sx={{ minWidth: '120px' }}>
                          <CardHeader
                            disableTypography
                            title={
                              <Typography variant="h6" noWrap sx={{ lineHeight: 1 }}>
                                Links Respondidos
                              </Typography>
                            }
                            sx={{ paddingBottom: '8px', display: 'block' }}
                          />
                          <CardContent sx={{ paddingBottom: '16px !important' }}>
                            <Typography
                              align="right"
                              sx={{
                                fontWeight: '500',
                                fontSize: '2.1rem',
                                lineHeight: '0.9'
                              }}
                            >
                              {summary.general.answered.toLocaleString(undefined, {
                                maximumFractionDigits: 2
                              })}
                            </Typography>
                            <Typography align="right" variant="body2">
                              {summary.general.total
                                ? (
                                    (summary.general.answered / summary.general.total) *
                                    100
                                  ).toFixed(2)
                                : 0}
                              %
                            </Typography>
                          </CardContent>
                        </Card>
                      </Stack>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardHeader title="Por encuesta" />
                  <CardContent>
                    <Box
                      sx={{ overflow: 'auto', width: '100%', height: '200px', maxHeight: '200px' }}
                    >
                      <DataGrid
                        disableColumnMenu
                        disableSelectionOnClick
                        disableColumnResize
                        disableColumnReorder
                        disableColumnSelector
                        // autoHeight
                        slots={{
                          toolbar: CustomToolbar
                        }}
                        hideFooter
                        density="compact"
                        rows={Object.values(summary.bySurvey) || []}
                        columns={summaryColumnsSurveys}
                        loading={summary.loading}
                        initialState={{
                          sorting: {
                            sortModel: [{ field: 'name', sort: 'desc' }]
                          },
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
              <Grid item xs={12} lg={6}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardHeader title="Por punto" />
                  <CardContent>
                    <Box
                      sx={{ overflow: 'auto', width: '100%', height: '200px', maxHeight: '200px' }}
                    >
                      <DataGrid
                        disableColumnMenu
                        disableSelectionOnClick
                        disableColumnSelector
                        disableColumnResize
                        disableColumnReorder
                        slots={{
                          toolbar: CustomToolbar
                        }}
                        hideFooter
                        density="compact"
                        rows={Object.values(summary.byGroup) || []}
                        columns={summaryColumnsPoints}
                        loading={summary.loading}
                        initialState={{
                          sorting: {
                            sortModel: [{ field: 'name', sort: 'desc' }]
                          },

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
                  <CardHeader
                    title="Listado General"
                    subheader="Todos los links únicos generados los puedes encontrar aquí"
                  />
                  <CardContent>
                    <Box style={{ height: '500px', width: '100%' }}>
                      <DataGrid
                        disableColumnMenu
                        loading={showLoader}
                        columns={columns}
                        rows={uniqueLinks}
                        disableColumnResize
                        density="compact"
                        disableColumnReorder
                        disableSelectionOnClick
                        slots={{
                          toolbar: CustomToolbar
                        }}
                        initialState={{
                          sorting: {
                            sortModel: [{ field: 'createdAt', sort: 'desc' }]
                          },
                          pinnedColumns: { right: ['answered'] },
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
        </Card>
      </Grid>
    </Grid>
  )
}

export default UniqueLinks
