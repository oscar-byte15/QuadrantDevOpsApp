import { Box, CardHeader, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TrendChart from '../../../charts/trendChart'
import { getTrend } from 'services/web_services/dashboard'
import moment from 'moment'
import { useSelector } from 'react-redux'

export default function TrendSection({ type }) {
  const agrupation = 1
  const [principalData, setPrincipalData] = useState([])
  const [maxAnswerQty, setMaxAnswerQty] = useState(0)
  const [secondaryData, setSecondaryData] = useState([])
  const startDate = useSelector(state => state.filter.startDate)
  const endDate = useSelector(state => state.filter.endDate)
  const secondaryStartDate = useSelector(state => state.filter.secondaryStartDate)
  const secondaryEndDate = useSelector(state => state.filter.secondaryEndDate)
  const comparingSecondaryDateRange = useSelector(state => state.filter.comparingSecondaryDateRange)
  const selectedGroups = useSelector(state => state.filter.selectedGroups)
  const selectedSurveys = useSelector(state => state.filter.selectedSurveys)
  const selectedDayparts = useSelector(state => state.filer.selectedDayparts)
  useEffect(() => {
    getTrend(
      startDate.startOf('day').toISOString(),
      endDate.endOf('day').toISOString(),
      agrupation,
      type,
      selectedGroups,
      selectedSurveys,
      selectedDayparts
    ).then(res => {
      const newData = mapTrendSerieDataWithPrincipalDates({
        series: res.data,
        agrupation,
        startDate,
        endDate
      })
      const data = [
        {
          data: newData,
          scoreType: type.toUpperCase(),
          type: 'area',
          name: type.toUpperCase() + ' ' + getLegend(startDate, endDate)
        }
      ]

      if (!comparingSecondaryDateRange)
        data.push({
          data: newData.map(el => ({ x: el.x, y: el.qty })),
          scoreType: 'Opiniones',
          type: 'line',
          name: 'Opiniones'
        })
      setMaxAnswerQty(res.maxQty)
      setPrincipalData(data)
    })

    if (secondaryData.length !== 0) {
      let newData = secondaryData[0]
      newData.data = mapTrendSerieDataWithPrincipalDates({
        series: newData.data,
        agrupation,
        startDate,
        endDate
      })
      setSecondaryData([newData])
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate, selectedGroups, selectedSurveys])

  useEffect(() => {
    if (comparingSecondaryDateRange) {
      getTrend(
        secondaryStartDate.startOf('day').toISOString(),
        secondaryEndDate.endOf('day').toISOString(),
        agrupation,
        type,
        selectedGroups,
        selectedSurveys,
        selectedDayparts
      ).then(res => {
        let newData = mapTrendSerieDataWithPrincipalDates({
          series: res.data,
          agrupation,
          startDate,
          endDate
        })
        setPrincipalData([principalData[0]])
        setSecondaryData([
          {
            data: newData,
            scoreType: type.toUpperCase(),
            type: 'area',
            name: type.toUpperCase() + ' ' + getLegend(secondaryStartDate, secondaryEndDate)
          }
        ])
      })
    } else {
      if (secondaryData.length !== 0 && principalData.length !== 0) {
        /*
        setPrincipalData([
          ...principalData,
          {
            data: principalData[0].data.map(el => ({
              x: el.x,
              y: el.qty
            })),
            scoreType: 'Opiniones',
            type: 'line',
            name: 'Opiniones'
          }
        ])
        */
      }

      setSecondaryData([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondaryStartDate, secondaryEndDate, comparingSecondaryDateRange])

  return (
    <Grid container>
      <Grid item xs={12}>
        <CardHeader style={{ paddingTop: '0', paddingBottom: '0' }} />
        <Box
          style={{
            width: '100%'
          }}
        >
          <TrendChart
            data={[...principalData, ...secondaryData]}
            compare={secondaryData.length !== 0}
            maxQty={maxAnswerQty}
          />
        </Box>
      </Grid>
    </Grid>
  )
}

const mapTrendSerieDataWithPrincipalDates = ({ series, startDate, endDate }) => {
  const period = 'day',
    times = 1
  let aux = startDate.clone()

  const getDateAndUpdate = () => {
    let dateToReturn = aux.clone().startOf('day').format('YYYY-MM-DD')
    aux.add(times, period).startOf(period)
    return dateToReturn
  }

  const serieData = series

  for (let i = 0; i < serieData.length; i++) {
    serieData[i].x = getDateAndUpdate()
  }

  if (period === 'week') {
    serieData.push({
      y: null,
      x: endDate.clone().format('YYYY-MM-DD')
    })
  }

  return serieData
}

const getLegend = (startDate, endDate) =>
  moment(startDate).locale('es').format('L') + ' - ' + moment(endDate).locale('es').format('L')
