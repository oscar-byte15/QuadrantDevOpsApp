import React, { useState, useEffect } from 'react'
import Chart from './calendarchart'
import { useSelector } from 'react-redux'
import moment from 'moment'

const CalendarSection = props => {
  const {
    data: { data }
  } = props //trendData
  const [calendarData, setCalendarData] = useState([])
  const startDate = useSelector(state => state.filter.actualMonth.startDate)

  useEffect(() => {
    let day = 0
    const calendarSeries = []
    let firstDayOfWeek = moment(startDate).weekday()

    for (let y = 1; y <= 5; y++) {
      let name = `Semana ${y}`
      let weekdata = []
      for (let i = 0; i <= 6; i++) {
        let dayData = data[day]

        if (dayData) {
          let sendNull = y === 1 && i < firstDayOfWeek
          if (sendNull) weekdata[i] = { x: '', y: 777 }
          else {
            weekdata[i] = { x: dayData.dateStr, y: dayData.y, qty: dayData.qty }
            day++
          }
        }
      }

      calendarSeries.unshift({ name, data: weekdata })
    }

    setCalendarData(calendarSeries)
    //eslint-disable-next-line
  }, [data])
  return <Chart data={calendarData} />
}
export default CalendarSection
