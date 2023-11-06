import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { selectOption } from '../../../../redux/actions/menu/actionDispatcher'
import { useSelector } from 'react-redux'
import MENU_OPTIONS from '../../../menu/menuSections'
import { useHistory } from 'react-router-dom'
import * as surveyAnswerServices from '../../../../services/web_services/surveysAnswersV2'
import { Typography, Link, Grid, CardHeader, CardContent, Breadcrumbs, Box } from '@mui/material'
import BodyCard from 'components/common/bodyCard'
import CsatDistributionChart from 'components/charts/csatDistribution'
import DataGrid from 'components/common/dataGrid'

export default function Question(props) {
  const dispatch = useDispatch()
  const history = useHistory()
  const filter = useSelector(state => state.filter)
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)

  const columns = [
    { field: 'id' },
    {
      field: 'evaluatioPoint',
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
      width: 400,
      headerAlign: 'center',
      align: 'center',
      disableColumnMenu: true,
      renderCell: params => {
        return <CsatDistributionChart variant="opinions" series={params.value} />
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
      .getCsatDistributionBySurveyAndQuestionAndEvaluationGroup(
        props.match.params.surveyId,
        props.match.params.questionId,
        filter.startDate.startOf('day').toISOString(),
        filter.endDate.endOf('day').toISOString(),
        filter.selectedChannels
      )
      .then(res => {
        let evaluationGroupsData = []
        let rows = []
        res.data.map(row => {
          rows.push({
            id: row.id,
            evaluatioPoint: row.name,
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
    filter.selectedChannels,
    props.match.params.questionId,
    props.match.params.surveyId
  ])

  return (
    <BodyCard>
      <CardHeader
        title="Distribución CSAT por encuestas"
        subheader={
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              onClick={() => {
                history.push('/quadrant/analysis/csatsurvey')
              }}
            >
              Todas las encuestas
            </Link>
            <Link
              underline="hover"
              onClick={() => {
                history.goBack()
              }}
            >
              {props.location.state.surveyName}
            </Link>
            <Typography color="textPrimary">{props.location.state.question}</Typography>
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
                initialState={{
                  pinnedColumns: { left: ['evaluatioPoint'] },
                  columns: {
                    columnVisibilityModel: {
                      id: false
                    }
                  },
                  sorting: {
                    sortModel: [{ field: 'score', sort: 'asc' }]
                  }
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </BodyCard>
  )
}
