import React, { useEffect, useState } from 'react'
import { Box, CircularProgress, Grid, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { getDistribution } from 'services/web_services/dashboard'
import GaugeChart from '../../../charts/gaugeChart'

const GaugeSection = props => {
  const distributionData = props.distributionData
  // const [distributionData, setDistributionData] = useState({ score: 0, series: [], loading: false })
  // const startDate = useSelector(state => state.filter.startDate)
  // const endDate = useSelector(state => state.filter.endDate)
  // const selectedGroups = useSelector(state => state.filter.selectedGroups)
  // const selectedSurveys = useSelector(state => state.filter.selectedSurveys)
  // const selectedChannels = useSelector(state => state.filter.selectedChannels)

  // useEffect(() => {
  //   const setDist = async () => {
  //     setDistributionData({ score: 0, series: [], loading: true })
  //     const chart_data = await getDistribution({
  //       startDate: startDate.startOf('day').toISOString(),
  //       endDate: endDate.endOf('day').toISOString(),
  //       type,
  //       selectedGroups,
  //       channel: selectedChannels,
  //       selectedSurveys
  //     })
  //       .then(res => {
  //         res.data.type = res.message == 'csat Distribution calculated' ? 'CSAT' : 'NPS'
  //         return res
  //       })
  //       .then(res => {
  //         setDistributionData({
  //           score: res.data.score,
  //           labels:
  //             res.data.type === 'CSAT'
  //               ? ['Satisfechos', 'Neutrales', 'Insatisfechos']
  //               : ['Promotores', 'Neutrales', 'Detractores'],
  //           series:
  //             res.data.type === 'CSAT'
  //               ? [res.data.positive, res.data.neutral, res.data.negative]
  //               : [res.data.promoter, res.data.neutral, res.data.detractor],
  //           loading: false
  //         })
  //         setQty(res.data.length)
  //       })
  //     return chart_data
  //   }
  //   if (
  //     startDate != '' ||
  //     endDate != '' ||
  //     type != '' ||
  //     setQty != '' ||
  //     selectedGroups != '' ||
  //     selectedSurveys != ''
  //   ) {
  //     setDist()
  //   }
  // }, [startDate, endDate, type, setQty, selectedGroups, selectedSurveys, selectedChannels])

  return (
    <GaugeChart
      score={distributionData?.score}
      series={distributionData?.series}
      labels={distributionData?.labels}
      loading={distributionData?.loading}
    />
  )
}

export default GaugeSection
