import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getCsatDistributionBySurvey } from 'services/web_services/surveysAnswersV2'
import CsatDistributionChart from 'components/charts/csatDistribution'

import DataGrid from 'components/common/dataGrid'

const Surveys = () => {
  const evaluationGroupId = useSelector(state => state.filter.selectedGroups)
  const surveyId = useSelector(state => state.filter.selectedSurveys)
  const startDate = useSelector(state => state.filter.actualMonth.startDate)
  const endDate = useSelector(state => state.filter.actualMonth.endDate)

  const [data, setData] = useState({ data: [], loading: false })

  useEffect(() => {
    setData(prevState => ({ ...prevState, data: [], loading: true }))
    getCsatDistributionBySurvey(startDate, endDate, evaluationGroupId, surveyId).then(res => {
      setData(prevState => ({ ...prevState, data: res.data, loading: false }))
    })
  }, [endDate, startDate, evaluationGroupId, surveyId])

  const distributionCsatChart = params => {
    return <CsatDistributionChart series={params.value} />
  }

  const columns = [
    { field: 'id', hide: true, hideable: false },
    { field: 'name', type: 'string', width: 200, headerName: 'Nombre' },
    { field: 'qty', type: 'number', width: 100, headerName: 'Rptas.' },
    {
      field: 'distribution',
      headerName: 'Distribución',
      sortable: false,
      flex: 1,
      minWidth: 200,
      renderCell: distributionCsatChart
    },
    { field: 'score', type: 'number', width: 90, headerName: 'Score' }
  ]

  return (
    <DataGrid
      columns={columns}
      rows={data.data}
      autoHeight
      density="compact"
      hideFooter
      disableColumnResize
      disableColumnReorder
      disableColumnMenu
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
export default Surveys
