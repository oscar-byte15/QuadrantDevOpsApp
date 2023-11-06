import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { selectOption } from '../../../../redux/actions/menu/actionDispatcher'
import { useSelector } from 'react-redux'
import MENU_OPTIONS from '../../../menu/menuSections'
import { useHistory } from 'react-router-dom'
import * as surveyAnswerServices from '../../../../services/web_services/surveysAnswersV2'
import { Grid, Card, CardHeader, CardContent, Box } from '@mui/material'
import NpsDistributionChart from 'components/charts/npsDistribution'
import DataGrid from 'components/common/dataGrid'
import { GridEventListener } from '@mui/x-data-grid-pro'

export default function NPSEvaluationPoint() {
  const dispatch = useDispatch()
  const history = useHistory()
  const filter = useSelector(state => state.filter)
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)

  const columns = [
    { field: 'id' },
    {
      field: 'evaluationPoint',
      headerName: 'Punto',
      type: 'string',
      resizable: false,
      sortable: true,
      flex: 1,
      minWidth: 250
    },
    {
      field: 'answers',
      headerName: 'Rptas.',
      type: 'number',
      resizable: false,
      sortable: true,
      width: 100
    },
    {
      field: 'distribution',
      headerName: 'Distribución',
      type: 'string',
      resizable: false,
      sortable: false,
      width: 600,
      headerAlign: 'center',
      disableColumnMenu: true,
      renderCell: params => {
        return <NpsDistributionChart series={params.value} />
      }
    },
    {
      field: 'score',
      headerName: 'Score NPS',
      type: 'number',
      resizable: false,
      sortable: true,
      disableColumnMenu: true,
      width: 120
    }
  ]

  useEffect(() => {
    dispatch(selectOption(MENU_OPTIONS.ANALYSIS.subMenu.NPS_X_EVALUATION_GROUP.id))
    setLoading(true)
    surveyAnswerServices
      .getNpsDistributionByEvaluationGroup(
        filter.startDate.startOf('day').toISOString(),
        filter.endDate.endOf('day').toISOString(),
        filter.selectedGroups,
        //filter.selectedChannels,
        ['getAll']
      )
      .then(res => {
        let rows = []
        res.data.map(row => {
          rows.push({
            id: row.id,
            evaluationPoint: row.name,
            answers: row.qty,
            distribution: row.distribution,
            score: row.score
          })
        })
        setRows(rows)
        setLoading(false)
      })
  }, [dispatch, filter.endDate, filter.startDate, history, filter.selectedGroups])

  const handleEvent: GridEventListener = (
    params, // GridRowParams
    event, // MuiEvent<React.MouseEvent<HTMLElement>>
    details // GridCallbackDetails
  ) => {
    history.push({
      pathname: '/quadrant/analysis/npsevagroup/' + params.row.id + '/surveys',
      state: { evaluationGroupName: params.row.evaluationPoint }
    })
  }

  const hola = {
    cursor: 'pointer'
  }
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card square variant="outlined">
            <CardHeader
              title="Distribución NPS por puntos de evaluación"
              subheader={filter.selectedGroups[0] === 'getAll' && 'Todos los puntos de evaluación'}
            />
            <CardContent className="quadrant-container-card__content">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ height: '500px' }}>
                    <DataGrid
                      rows={rows}
                      rowHeight={80}
                      columns={columns}
                      loading={loading}
                      onRowClick={handleEvent}
                      initialState={{
                        pinnedColumns: { left: ['evaluationPoint'] },
                        columns: {
                          columnVisibilityModel: {
                            id: false
                          }
                        },
                        sorting: {
                          sortModel: [{ field: 'score', sort: 'asc' }]
                        }
                      }}
                      slotProps={{ row: { style: { cursor: 'pointer' } } }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}
