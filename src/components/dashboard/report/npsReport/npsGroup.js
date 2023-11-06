import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getNpsDistributionByEvaluationGroup } from 'services/web_services/surveysAnswersV2'
import NpsDistributionChart from 'components/charts/npsDistribution'
import DataGrid from 'components/common/dataGrid'

const Groups = () => {
  const startDate = useSelector(state => state.filter.actualMonth.startDate)
  const endDate = useSelector(state => state.filter.actualMonth.endDate)
  const selectedGroups = useSelector(state => state.filter.selectedGroups)
  const selectedChannels = useSelector(state => state.filter.selectedChannels)
  const selectedSurveys = useSelector(state => state.filter.selectedSurveys)

  const NPSChart = params => {
    return <NpsDistributionChart series={params.value} />
  }

  const columns = [
    { field: 'id', hide: true, hideable: false },
    { field: 'name', type: 'string', width: 200, headerName: 'Nombre' },
    { field: 'qty', type: 'number', width: 100, headerName: 'Rptas.' },
    {
      field: 'distribution',
      headerName: 'Distribucion',
      sortable: false,
      flex: 1,
      minWidth: 200,
      renderCell: NPSChart
    },
    { field: 'score', type: 'number', width: 90, headerName: 'Score' }
  ]

  const [data, setData] = useState({ data: [], loading: false })

  useEffect(() => {
    setData({ data: [], loading: true })

    getNpsDistributionByEvaluationGroup(
      startDate,
      endDate,
      selectedGroups,
      selectedChannels,
      selectedSurveys
    ).then(res => {
      setData({ data: res.data, loading: false })
    })
  }, [endDate, startDate, selectedGroups, selectedSurveys])

  return (
    <DataGrid
      columns={columns}
      rows={data.data}
      loading={data.loading}
      hideFooter
      autoHeight
      disableColumnResize
      disableColumnReorder
      disableColumnMenu
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

export default Groups
