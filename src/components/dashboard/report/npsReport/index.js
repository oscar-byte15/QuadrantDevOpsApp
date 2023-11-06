import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import CustomCard from 'components/common/card'
import MonthlyScores from '../common/monthlyScores'
import MonthlyTrend from '../common/monthlyTrend'
import TrendSection from '../common/trend'
import CalendarSection from '../common/calendar'
import GroupsDistribution from './npsGroup'
import { Grid, Card, CardContent, CardHeader } from '@mui/material'
import { getNpsScoreTable, getTrend } from 'services/web_services/dashboard'
import MonthSelector from 'components/filter/monthSelector'
import CenteredMessage from 'components/common/centeredText'
import DataGrid from 'components/common/dataGrid'
import BodyCard from 'components/common/bodyCard'

const NpsReport = () => {
  const {
    //TODO REFACTORIZAR
    selectedSurveys: surveys,
    selectedGroups: evaluationGroups,
    selectedChannels,
    actualMonth: { startDate, endDate, label }
  } = useSelector(state => state.filter)
  const [trendData, setTrendData] = useState({ data: [] })
  const [data, setData] = useState({ table: { rows: [], columns: [] }, loading: false })

  const callAllServices = async () => {
    setData(prevState => ({ ...prevState, loading: true }))
    const trend = await getTrend(
      startDate,
      endDate,
      '1',
      'nps',
      evaluationGroups,
      selectedChannels,
      surveys
    )
    if (trend.noData) setTrendData({ data: [] })
    else setTrendData(trend)

    const table = await getNpsScoreTable({
      startDate,
      endDate,
      evaluationGroups,
      channel: selectedChannels,
      surveys
    })

    const groupColumns = table.data.columns.map(col => ({
      field: col.id,
      headerName: col.name,
      description: col.name,
      flex: 1,
      minWidth: 150,
      type: 'number'
    }))

    const newTable = {
      columns: [
        { field: 'id', hide: true, hideable: false },
        { field: 'name', headerName: 'Puntos de Evaluación', type: 'string', width: 200 },
        ...groupColumns
      ],
      rows: [...table.data.rows]
    }

    setData(prevState => ({ ...prevState, table: newTable, loading: false }))
  }
  useEffect(() => {
    if (evaluationGroups.length > 0 && surveys.length > 0) callAllServices()
    //eslint-disable-next-line
  }, [startDate, endDate, evaluationGroups, surveys, selectedChannels])

  return (
    <BodyCard>
      <CardHeader title="Reporte Mensual NPS " subheader={label} action={<MonthSelector />} />
      <CardContent>
        <Grid container spacing={1}>
          <CustomCard
            gridProps={{ item: true, xs: 12, sm: 6, md: 4 }}
            outlined
            headerProps={{ title: label, style: { paddingBottom: '0' } }}
            children={<MonthlyScores type="nps" />}
          />
          <CustomCard
            gridProps={{ item: true, xs: 12, sm: 6, md: 8 }}
            outlined
            headerProps={{ title: 'Periodos Anteriores', style: { paddingBottom: '0' } }}
            children={<MonthlyTrend type="nps" />}
          />
          <CustomCard
            gridProps={{ item: true, xs: 12, md: 6 }}
            outlined
            headerProps={{ title: 'Desarrollo Mensual NPS' }}
            children={<TrendSection data={trendData} type="nps" />}
          />
          <CustomCard
            gridProps={{ item: true, xs: 12, md: 6 }}
            outlined
            headerProps={{ title: 'Calendario NPS' }}
            children={<CalendarSection data={trendData} />}
          />
          <CustomCard
            gridProps={{ item: true, xs: 12 }}
            outlined
            headerProps={{ title: 'Encuestas y Puntos' }}
          >
            <DataGrid
              {...data.table}
              autoHeight
              loading={data.loading}
              disableColumnResize
              disableColumnReorder
              disableColumnMenu
              density="compact"
              hideFooter
              initialState={{
                pinnedColumns: { left: ['name'] },
                columns: {
                  columnVisibilityModel: {
                    id: false
                  }
                }
              }}
            />
          </CustomCard>
          <CustomCard
            gridProps={{ item: true, xs: 12 }}
            outlined
            headerProps={{ title: 'Distribución por Grupos' }}
            children={<GroupsDistribution />}
          />
        </Grid>
      </CardContent>
    </BodyCard>
  )
}
export default NpsReport
