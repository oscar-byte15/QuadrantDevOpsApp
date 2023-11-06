import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getCsatDistributionByEvaluationGroup } from 'services/web_services/surveysAnswersV2'
import { getCsatScoreTable, getTrend } from 'services/web_services/dashboard'

import DataGrid from 'components/common/dataGrid'

const ExperienceTable = () => {
  const evaluationGroupId = useSelector(state => state.filter.selectedGroups)
  const surveyId = useSelector(state => state.filter.selectedSurveys)
  const label = useSelector(state => state.filter.actualMonth.label)
  const startDate = useSelector(state => state.filter.actualMonth.startDate)
  const endDate = useSelector(state => state.filter.actualMonth.endDate)
  const selectedSurveys = useSelector(state => state.filter.selectedSurveys)
  const selectedGroups = useSelector(state => state.filter.selectedGroups)

  const [data, setData] = useState({ data: [], loading: false })
  const [columns, setColumns] = useState([
    { field: 'id', hide: true, hideable: false },
    { field: 'name', headerName: 'Puntos de Evaluación', type: 'string', width: 200 }
  ])

  const distributionCsatChart = params => {
    return <CsatDistributionChart series={params.value} />
  }

  useEffect(() => {}, [columns])

  useEffect(() => {
    setData(prevState => ({ ...prevState, data: [], loading: true }))

    getCsatScoreTable({
      startDate,
      endDate,
      evaluationGroups: selectedGroups,
      surveys: selectedSurveys
    }).then(res => {
      res.data.columns.map(col => {
        setColumns(prevState => [
          ...prevState,
          {
            field: col.id,
            headerName: col.name,
            description: col.name,
            flex: 1,
            minWidth: 150,
            type: 'number'
          }
        ])
      })
      setData(prevState => ({ ...prevState, data: res.data.rows, loading: false }))
    })
  }, [endDate, startDate, selectedGroups, selectedSurveys])

  return (
    <DataGrid
      autoHeight
      columns={columns}
      rows={data.data}
      disableColumnResize
      disableColumnReorder
      density="compact"
      disableColumnMenu
      hideFooter
      loading={data.loading}
      initialState={{
        pinnedColumns: { left: ['name'] },
        sorting: {
          sortModel: [{ field: 'score', sort: 'desc' }]
        },
        columns: {
          columnVisibilityModel: {
            id: false
          }
        }
      }}
    />
  )
}
export default ExperienceTable
