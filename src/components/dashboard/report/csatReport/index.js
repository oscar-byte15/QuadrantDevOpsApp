import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import CustomCard from 'components/common/card'
import MonthlyScores from '../common/monthlyScores'
import MonthlyTrend from '../common/monthlyTrend'
import TrendSection from '../common/trend'
import CalendarSection from '../common/calendar'
import SurveyDistribution from './csatSurvey'
import GroupDistribution from './csatGroup'
import { Grid, Card, CardContent, CardHeader, CardActions, Button } from '@mui/material'
import { getCsatScoreTable, getTrend } from 'services/web_services/dashboard'
import MonthSelector from 'components/filter/monthSelector'
import DataGrid from 'components/common/dataGrid'
import CenteredMessage from 'components/common/centeredText'
import BodyCard from 'components/common/bodyCard'
import ExperienceTable from './experienceTable'

const CsatReport = () => {
  const {
    selectedSurveys,
    selectedGroups,
    selectedChannels,
    actualMonth: { startDate, endDate, label }
  } = useSelector(state => state.filter)
  const [trendData, setTrendData] = useState({ data: [] })
  const [data, setData] = useState({ table: { rows: [], columns: [] } })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const callAllServices = async () => {
      const trend = await getTrend(
        startDate,
        endDate,
        '1',
        'csat',
        selectedGroups,
        selectedSurveys,
        selectedChannels
      )

      if (trend.noData) setTrendData({ data: [] })
      else setTrendData(trend)

      const table = await getCsatScoreTable({
        startDate,
        endDate,
        evaluationGroups: selectedGroups,
        channel: selectedChannels,
        surveys: selectedSurveys
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

      setData({ table: newTable })
      setLoading(false)
    }
    if (selectedGroups.length > 0 && selectedSurveys.length > 0) callAllServices()
  }, [startDate, endDate, selectedGroups, selectedSurveys, selectedChannels])

  return (
    <BodyCard>
      <CardHeader title="Reporte Mensual CSAT" subheader={label} action={<MonthSelector />} />
      <CardContent>
        <Grid container spacing={1}>
          <CustomCard
            gridProps={{ item: true, xs: 12, sm: 6, md: 4 }}
            outlined
            headerProps={{ title: label, style: { paddingBottom: '0' } }}
            children={<MonthlyScores type="csat" />}
          />
          <CustomCard
            gridProps={{ item: true, xs: 12, sm: 6, md: 8 }}
            outlined
            headerProps={{ title: 'Periodos Anteriores', style: { paddingBottom: '0' } }}
            children={<MonthlyTrend type="csat" />}
          />
          <CustomCard
            gridProps={{ item: true, xs: 12, md: 6 }}
            outlined
            headerProps={{ title: 'Desarrollo Mensual CSAT' }}
            children={<TrendSection data={trendData} />}
          />
          <CustomCard
            gridProps={{ item: true, xs: 12, md: 6 }}
            outlined
            headerProps={{ title: 'Calendario CSAT' }}
            children={<CalendarSection data={trendData} />}
          />
          <CustomCard
            gridProps={{ item: true, xs: 12 }}
            outlined
            headerProps={{
              title: 'Encuestas y Puntos',
              subheader: 'Puntuación en cada caso'
            }}
          >
            <DataGrid
              {...data.table}
              autoHeight
              disableColumnResize
              disableColumnReorder
              density="compact"
              disableColumnMenu
              hideFooter
              loading={loading}
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
            headerProps={{
              title: 'Encuestas y Puntos wwdwd',
              subheader: 'Puntuación en cada caso'
            }}
            children={<ExperienceTable />}
          />

          <CustomCard
            gridProps={{ item: true, xs: 12 }}
            outlined
            headerProps={{ title: 'Distribución por Puntos' }}
            children={<GroupDistribution />}
          />

          <CustomCard
            gridProps={{ item: true, xs: 12 }}
            outlined
            headerProps={{ title: 'Distribución por Encuestas' }}
            children={<SurveyDistribution />}
          />
        </Grid>
      </CardContent>
    </BodyCard>
  )
}

export default CsatReport
