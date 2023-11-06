import React, { useState, useEffect } from 'react'
import TempChart from './trendchart'

const initState = { series: [], labels: [] }
const TrendSection = props => {
  const { data, type = 'csat' } = props
  const [trendData, setTrendData] = useState(initState)

  const transformDataToGraphicData = () => {
    const trendQtys = data.data.map(el => (el.qty ? el.qty : null))
    const trendScores = data.data.map((el, i) => (trendQtys[i] ? el.y : null))
    const labels = data.data.map(el => el.x)

    setTrendData({
      series: [
        { name: type.toUpperCase(), type: 'column', data: trendScores },
        { name: 'Respuestas', type: 'line', data: trendQtys }
      ],
      labels: labels,
      maxQty: data.maxQty
    })
  }

  useEffect(() => {
    if (data.data.length > 0) transformDataToGraphicData()
    else setTrendData(initState)

    //eslint-disable-next-line
  }, [data])
  return <TempChart chartProps={{ height: '300px', width: '100%' }} data={trendData} />
}
export default TrendSection
