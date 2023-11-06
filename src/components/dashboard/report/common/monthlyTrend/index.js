import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { getTrend } from 'services/web_services/dashboard'
import Trend from './trendtestchart'
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Stack
} from '@mui/material'

const MonthlyTrend = props => {
  const { type = 'csat' } = props
  const {
    selectedSurveys,
    selectedGroups,
    selectedChannels,
    actualMonth: { startDate }
  } = useSelector(state => state.filter)
  const [trendData, setTrendData] = useState({ series: [], labels: [] })

  const shouldShow = () => selectedGroups.length > 0 && selectedSurveys.length > 0

  const callAllServices = async () => {
    let _startDate = moment(startDate).subtract(4, 'month').startOf('month').toISOString()
    let _endDate = moment(startDate).subtract(1, 'month').endOf('month').toISOString()

    const trend = await getTrend(
      _startDate,
      _endDate,
      '3', // 1: day, 2: week, 3: month
      type, // csat or nps
      selectedGroups, // groups id list
      selectedChannels,
      selectedSurveys // survey id list
    )

    const trendQtys = trend.data.map(el => el.qty)
    const trendScores = trend.data.map(el => el.y)
    const labels = trend.data.map(el => el.x)

    setTrendData({
      series: [
        { name: type.toUpperCase(), type: 'column', data: trendScores },
        { name: 'Respuestas', type: 'line', data: trendQtys }
      ],
      labels: labels,
      maxQty: trend.maxQty
    })
  }

  useEffect(() => {
    if (shouldShow()) {
      callAllServices()
    }
    //eslint-disable-next-line
  }, [startDate, selectedSurveys, selectedGroups, selectedChannels])

  return (
    <>
      <Stack direction={{ xs: 'column-reverse', md: 'row' }} spacing={1}>
        <List dense sx={{ width: { xs: '100%', md: '50%' } }}>
          {trendData.labels.map((el, i) => {
            let rptas = trendData.series[1].data[i]
            return (
              <ListItem key={el}>
                <ListItemText
                  style={{ textTransform: 'capitalize' }}
                  primary={moment(el).format('MMMM YYYY')}
                  secondary={`${rptas ? rptas : 0} respuestas`}
                />
                <ListItemSecondaryAction>
                  <Typography variant="body1">{trendData.series[0].data[i]}</Typography>
                </ListItemSecondaryAction>
              </ListItem>
            )
          })}
        </List>
        <Box sx={{ maxHeight: { xs: '200px', md: '230px' } }}>
          <Trend data={trendData} />
        </Box>
      </Stack>
    </>
  )
}
export default MonthlyTrend
