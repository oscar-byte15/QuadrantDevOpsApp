import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { selectOption } from '../../../../redux/actions/menu/actionDispatcher'
import { useSelector } from 'react-redux'
import MENU_OPTIONS from '../../../menu/menuSections'
import { useHistory } from 'react-router-dom'
import * as surveyAnswerServices from '../../../../services/web_services/surveysAnswersV2'
import { Typography, Link, Grid, CardHeader, CardContent, Breadcrumbs, Box } from '@mui/material'
import BodyCard from 'components/common/bodyCard'
import { GridEventListener } from '@mui/x-data-grid-pro'
import CsatDistributionChart from 'components/charts/csatDistribution'

import DataGrid from 'components/common/dataGrid'

export default function Survey(props) {
  const dispatch = useDispatch()
  const history = useHistory()
  const filter = useSelector(state => state.filter)
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)

  const columns = [
    { field: 'id' },
    {
      field: 'question',
      headerName: 'Pregunta',
      type: 'string',
      resizable: false,
      sortable: true,
      flex: 1,
      minWidth: 400
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
      .getCsatDistributionBySurveyAndQuestion(
        props.match.params.surveyId,
        filter.startDate.startOf('day').toISOString(),
        filter.endDate.endOf('day').toISOString(),
        filter.selectedChannels
      )
      .then(res => {
        let rows = []
        res.data.map(row => {
          rows.push({
            id: row.id,
            question: row.name,
            answers: row.answers.length,
            distribution: row.answers.distribution,
            score: row.answers.score
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
    props.location.state.surveyName,
    props.match.params.surveyId,
    filter.selectedChannels
  ])

  const handleEvent: GridEventListener = (
    params, // GridRowParams
    event, // MuiEvent<React.MouseEvent<HTMLElement>>
    details // GridCallbackDetails
  ) => {
    history.push({
      pathname:
        '/quadrant/analysis/csatsurvey/' +
        props.match.params.surveyId +
        '/questions/' +
        params.row.id,
      state: { surveyName: props.location.state.surveyName, question: params.row.question }
    })
  }

  return (
    <BodyCard>
      <CardHeader
        title="Distribución CSAT por encuestas"
        subheader={
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              onClick={() => {
                history.goBack()
              }}
            >
              Todas las encuestas
            </Link>
            <Typography color="textPrimary">{props.location.state.surveyName}</Typography>
          </Breadcrumbs>
        }
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
                  pinnedColumns: { left: ['question'] },
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
