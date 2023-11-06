import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { selectOption } from '../../../../redux/actions/menu/actionDispatcher'
import { useSelector } from 'react-redux'
import MENU_OPTIONS from '../../../menu/menuSections'
import { useHistory } from 'react-router-dom'
import * as surveyAnswerServices from '../../../../services/web_services/surveysAnswersV2'
import { Grid, CardHeader, CardContent, Box } from '@mui/material'
import CsatDistributionChart from 'components/charts/csatDistribution'
import BodyCard from 'components/common/bodyCard'
import { GridEventListener } from '@mui/x-data-grid-pro'
import DataGrid from 'components/common/dataGrid'

export default function CSATSurvey() {
  const dispatch = useDispatch()
  const history = useHistory()
  const filter = useSelector(state => state.filter)
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)

  const columns = [
    { field: 'id' },
    {
      field: 'survey',
      headerName: 'Encuesta',
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
      width: 400,
      headerAlign: 'center',
      align: 'center',
      disableColumnMenu: true,
      renderCell: params => {
        return <CsatDistributionChart series={params.value} />
      }
    },
    {
      field: 'score',
      headerName: 'Score CSAT',
      type: 'number',
      resizable: false,
      sortable: true,
      disableColumnMenu: true,
      width: 120
    }
  ]

  useEffect(() => {
    dispatch(selectOption(MENU_OPTIONS.ANALYSIS.subMenu.CSAT_X_SURVEY.id))
    setLoading(true)
    surveyAnswerServices
      .getCsatDistributionBySurvey(
        filter.startDate.startOf('day').toISOString(),
        filter.endDate.endOf('day').toISOString(),
        ['getAll'],
        filter.selectedChannels,
        filter.selectedSurveys
      )
      .then(res => {
        let rows = []
        res.data.map(row => {
          rows.push({
            id: row.id,
            survey: row.name,
            answers: row.qty,
            distribution: row.distribution,
            score: row.score
          })
        })
        setRows(rows)
        setLoading(false)
      })
  }, [
    dispatch,
    filter.endDate,
    filter.startDate,
    history,
    filter.selectedSurveys,
    filter.selectedChannels
  ])

  const handleEvent: GridEventListener = (
    params, // GridRowParams
    event, // MuiEvent<React.MouseEvent<HTMLElement>>
    details // GridCallbackDetails
  ) => {
    history.push({
      pathname: '/quadrant/analysis/csatsurvey/' + params.row.id + '/questions',
      state: { surveyName: params.row.survey }
    })
  }

  return (
    <BodyCard>
      <CardHeader
        title="Distribución CSAT por encuestas"
        subheader={filter.selectedSurveys[0] === 'getAll' && 'Todas las encuestas'}
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
                  pinnedColumns: { left: ['survey'] },
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
    </BodyCard>
  )
}
