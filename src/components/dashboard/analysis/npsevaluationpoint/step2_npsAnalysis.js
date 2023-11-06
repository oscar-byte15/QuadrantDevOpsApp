import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { selectOption } from '../../../../redux/actions/menu/actionDispatcher'
import { useSelector } from 'react-redux'
import MENU_OPTIONS from '../../../menu/menuSections'
import { useHistory } from 'react-router-dom'
import * as surveyAnswerServices from '../../../../services/web_services/surveysAnswersV2'
import NpsDistributionChart from 'components/charts/npsDistribution'
import {
  Typography,
  Link,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Breadcrumbs,
  Box
} from '@mui/material'
import DataGrid from 'components/common/dataGrid'

export default function Survey(props) {
  const dispatch = useDispatch()
  const history = useHistory()
  const filter = useSelector(state => state.filter)
  const [surveys, setSurveys] = useState([])

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
      flex: 1
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
      align: 'center',
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
      .getNpsDistributionByEvaluationGroupAndSurvey(
        props.match.params.evaluationGroupId,
        //filter.selectedChannels,
        filter.startDate.startOf('day').toISOString(),
        filter.endDate.endOf('day').toISOString()
      )
      .then(res => {
        let rows = []

        res.data.map(row => {
          rows.push({
            id: row.id,
            survey: row.name,
            answers: row.answers.length,
            distribution: row.answers.dataArray,
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
    //filter.selectedChannels,
    history,
    props.location.state.evaluationGroupName,
    props.match.params.evaluationGroupId
  ])

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card square variant="outlined">
            <CardHeader
              title="Distribución NPS por puntos de evaluación"
              subheader={
                <Breadcrumbs aria-label="breadcrumb">
                  <Link
                    underline="hover"
                    onClick={() => {
                      history.goBack()
                    }}
                  >
                    Todos los puntos de evaluación
                  </Link>
                  <Typography color="textPrimary">
                    {props.location.state.evaluationGroupName}
                  </Typography>
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
                      // onRowClick={handleEvent}
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
