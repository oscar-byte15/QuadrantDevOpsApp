import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  Grid,
  Select,
  MenuItem,
  LinearProgress
} from '@mui/material'
import { GridToolbarContainer, GridToolbarExport, useGridApiRef } from '@mui/x-data-grid-pro'
import { Info } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import DataGrid from 'components/common/dataGrid'
import KPI from '../../../common/quadrantComponents/KpiCard'

import Questions from '../common/questions'

import {
  getPinkberryData,
  getTotalDataPinkberry,
  listSurveys,
  getDPQ
} from 'services/web_services/quadrantReport'
import { useSelector } from 'react-redux'

import Sticky from 'react-stickynode'

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-toward-subtle.css'
import BodyCard from 'components/common/bodyCard'

// goal y bottom se reemplazará por un dato determinado en la tabla de configuración de marca
const goal = 85
const bottom = 50

const columns = [
  { field: 'id', headerName: 'ID', width: 190 },
  {
    field: 'name',
    headerName: 'Nombre',
    minWidth: 180,
    flex: 1,
    type: 'string'
  },
  {
    field: 'participants',
    headerName: 'Respuestas',
    type: 'number',
    width: 95
  },
  {
    field: 'csatScore',
    headerName: 'CSAT',
    type: 'number',
    width: 95
  },
  {
    field: 'npsScore',
    headerName: 'NPS',
    type: 'number',
    width: 95
  },
  {
    field: 'returnScore',
    headerName: 'Retorno',
    type: 'number',
    width: 110
  },
  { field: 'quadrantScore', headerName: 'Score Final', type: 'number', width: 130 },
  {
    field: 'status',
    type: 'string',
    renderHeader: () => (
      <>
        <Tippy
          content={
            <span style={{ fontSize: '12px' }}>
              Top → Score Final mayor o igual que {goal}.<br /> Bottom → Score Final menor que{' '}
              {bottom}.
            </span>
          }
          placement="top-end"
          animation="shift-toward-subtle"
        >
          <Info fontSize="18px" color="common.black" sx={{ marginRight: '3px', opacity: '0.6' }} />
        </Tippy>
        <Typography
          variant="body2"
          sx={{
            fontWeight: '500',
            lineHeight: '56px',
            textOverflow: 'ellipsis',
            cursor: 'default'
          }}
        >
          Categoría
        </Typography>
      </>
    ),
    align: 'right',
    headerAlign: 'right',
    width: 120,
    sortable: false,
    renderCell: params => (
      <Typography
        sx={{
          fontWeight: '500',
          color:
            params.row.status === 'top'
              ? 'secondary.main'
              : params.row.status === 'bottom'
              ? 'red.main'
              : 'white'
        }}
      >
        {params.row.status}
      </Typography>
    )
  }
]

const pinkberryReport = () => {
  const theme = useTheme()
  const apiRef = useGridApiRef()
  const [gridData, setGridData] = useState({ data: [], GridLoading: false })
  const [KPIsData, setKPIsData] = useState({ data: {}, KPIsLoading: false })
  const [DPQData, setDPQData] = useState({ data: {}, DPQLoading: false })
  const [surveys, setSurveys] = useState([])
  const [selectedSurvey, setSelectedSurvey] = useState({ id: '', name: '' })
  const [rows, setRows] = useState([])

  const filter = useSelector(state => state.filter)

  const changeSurvey = (surveyID, name) => {
    gridData.GridLoading = true
    setSelectedSurvey({ id: surveyID, name: name })
  }

  useEffect(() => {
    const handleUpdateAllRows = data => {
      const visibleRows = apiRef.current.getAllRowIds()

      const actualData = []

      data != 'NO_INF'
        ? data.map(e => {
            actualData.push(e.id)
          })
        : ''

      let difference = visibleRows.filter(x => !actualData.includes(x))

      difference.map(e => {
        data.push({ id: e, action: 'delete' })
      })

      apiRef.current.updateRows(
        data == 'NO_INF'
          ? []
          : data.map(data => ({
              id: data.id,
              name: data.name,
              participants: data.participants,
              csatScore: data.csatScore,
              npsScore: data.npsScore,
              returnScore: data.customScore,
              quadrantScore: data.quadrantScore,
              status: data.status,
              _action: data.action
            }))
      )
    }

    if (gridData.GridLoading == false) {
      handleUpdateAllRows(gridData.data)
    }
  }, [gridData, filter.startDate, filter.endDate])

  useEffect(() => {
    const setData = async () => {
      const data = await listSurveys()
        .then(response => response.data)

        .then(data => setSurveys(data))
      return data
    }
    if (surveys.length == 0) {
      const inf = setData()
    }
  }, [])

  useEffect(() => {
    const setDPQ = async () => {
      setDPQData({ data: {}, DPQLoading: true })
      const total_data = await getDPQ(
        filter.startDate.startOf('day').toISOString(),
        filter.endDate.endOf('day').toISOString(),
        selectedSurvey.id
      )
        .then(response => response.data)
        .then(data => {
          data.map(question => {
            let sortingPoints = question.evaluationPoints
            sortingPoints.sort((e1, e2) =>
              +e1.csatScore < +e2.csatScore ? 1 : +e1.csatScore > +e2.csatScore ? -1 : 0
            )
          })
          return data
        })
        .then(data => {
          data.sort((d1, d2) =>
            +d1.csatScore < +d2.csatScore ? 1 : +d1.csatScore > +d2.csatScore ? -1 : 0
          )
          return data
        })
        .then(data => {
          setDPQData({ data: data, DPQLoading: 'false' })
        })
      return total_data
    }
    if (selectedSurvey.id != '') {
      setDPQ()
    }
  }, [selectedSurvey, filter.startDate, filter.endDate])

  useEffect(() => {
    const getGridData = async () => {
      setGridData({ GridLoading: true })
      const grid_data = await getPinkberryData(
        filter.startDate.startOf('day').toISOString(),
        filter.endDate.endOf('day').toISOString(),
        selectedSurvey.id
      )
        .then(response => {
          if (response.message == 'NO_INF') {
            setGridData({ data: [], GridLoading: false })
            return 'NO_INF'
          } else {
            return response.data
          }
        })
        .then(data => {
          data == 'NO_INF'
            ? setGridData({ data: [], GridLoading: false })
            : data.map(item => {
                if (item.quadrantScore > goal) {
                  item.status = 'top'
                }
                if (item.quadrantScore < bottom) {
                  item.status = 'bottom'
                }
              })
          setGridData({ data: data, GridLoading: false })
        })
      return grid_data
    }
    if (selectedSurvey.id != '') {
      getGridData()
    }
  }, [selectedSurvey, filter.startDate, filter.endDate])

  useEffect(() => {
    const getKPIs = async () => {
      setKPIsData({ data: {}, KPIsLoading: true })
      const total_data = await getTotalDataPinkberry(
        filter.startDate.startOf('day').toISOString(),
        filter.endDate.endOf('day').toISOString(),
        selectedSurvey.id
      )
        .then(response => response.data)
        .then(data => {
          setKPIsData({ data: data, KPIsLoading: 'false' })
        })
      return total_data
    }
    if (selectedSurvey.id != '') {
      getKPIs()
    }
  }, [selectedSurvey, filter.startDate, filter.endDate])

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport
          csvOptions={{
            fileName: Date.now() + ' - ' + selectedSurvey.name,
            delimiter: ';',
            utf8WithBom: true
          }}
          printOptions={{ disableToolbarButton: true }}
        />
      </GridToolbarContainer>
    )
  }

  const { GridLoading } = gridData
  const { KPIsLoading } = KPIsData

  return (
    <>
      <BodyCard>
        <Stack
          spacing={1}
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          sx={{ padding: '16px' }}
        >
          <Typography variant="h5">Reporte de encuesta Pinkberry →</Typography>
          <Select variant="outlined" autoWidth defaultValue={0} size="small">
            <MenuItem value={0} disabled>
              {surveys.length == 0 ? 'Cargando...' : 'Seleccione una encuesta'}
            </MenuItem>
            {surveys.map((item, index) => {
              return (
                <MenuItem
                  value={index + 1}
                  key={item.id}
                  onClick={() => changeSurvey(item.id, item.name)}
                >
                  {item.name}
                </MenuItem>
              )
            })}
          </Select>
        </Stack>

        <CardContent sx={{ minHeight: '500px' }}>
          <Stack spacing={1}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
              <Box
                sx={{
                  width: {
                    xs: '100%',
                    sm: '220px'
                  }
                }}
              >
                <Sticky
                  enabled={useMediaQuery(theme.breakpoints.up('sm'))}
                  top={140}
                  bottomBoundary={1100}
                >
                  <Stack spacing={1}>
                    <KPI
                      goal={goal}
                      bottom={bottom}
                      loading={KPIsLoading}
                      title="nps"
                      score={KPIsData.data.nps}
                    />
                    <KPI
                      goal={goal}
                      bottom={bottom}
                      loading={KPIsLoading}
                      title="csat"
                      score={KPIsData.data.csat}
                    />
                    <KPI
                      goal={goal}
                      bottom={bottom}
                      loading={KPIsLoading}
                      title="retorno"
                      score={KPIsData.data.retorno}
                    />
                  </Stack>
                </Sticky>
              </Box>

              <Box sx={{ width: '100%' }}>
                <Stack spacing={2}>
                  <Card variant="outlined">
                    <CardContent sx={{ paddingBottom: '16px!important' }}>
                      <Stack spacing={1}>
                        <Typography
                          sx={{ fontSize: 16, fontWeight: '500' }}
                          color="text.secondary"
                          gutterBottom
                        >
                          Puntos de evaluación
                        </Typography>

                        <Box sx={{ height: '500px' }}>
                          <DataGrid
                            apiRef={apiRef}
                            disableSelectionOnClick
                            disableColumnResize
                            disableColumnReorder
                            //hideFooter
                            rowCount={rows.lenght}
                            rows={rows}
                            columns={columns}
                            loading={GridLoading}
                            slots={{
                              toolbar: CustomToolbar
                            }}
                            initialState={{
                              sorting: {
                                sortModel: [{ field: 'quadrantScore', sort: 'desc' }]
                              },
                              pinnedColumns: { left: ['name'] },
                              columns: {
                                columnVisibilityModel: {
                                  id: false
                                }
                              }
                            }}
                          />
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                  <Questions goal={goal} bottom={bottom} res={DPQData} />
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </CardContent>
      </BodyCard>
    </>
  )
}
export default pinkberryReport
