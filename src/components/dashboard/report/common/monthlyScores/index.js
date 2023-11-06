import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import MonthlyScoreCards from './monthlyScore'
import { getCsatScore, getNpsScore } from 'services/web_services/dashboard'
import moment from 'moment'

const MonthlyScores = props => {
  const { type } = props
  const actualMonth = useSelector(state => state.filter.actualMonth)
  const selectedEvaluationGroups = useSelector(state => state.filter.selectedGroups)
  const selectedSurveys = useSelector(state => state.filter.selectedSurveys)
  const selectedChannels = useSelector(state => state.filter.selectedChannels)

  const [scores, setScores] = useState({
    actualMonth: { score: 0, label: '' },
    prevYear: { score: 0, label: '' }
  })

  const callService = async () => {
    let ams, pys
    if (type === 'csat') {
      ams = await getCsatScore(
        actualMonth.startDate,
        actualMonth.endDate,
        selectedEvaluationGroups,
        selectedChannels,
        selectedSurveys
      )

      pys = await getCsatScore(
        moment(actualMonth).subtract(1, 'year').startOf('month'),
        moment(actualMonth).subtract(1, 'year').endOf('month'),
        selectedEvaluationGroups,
        selectedChannels,
        selectedSurveys
      )
    } else if (type === 'nps') {
      ams = await getNpsScore(
        actualMonth.startDate,
        actualMonth.endDate,
        selectedEvaluationGroups,
        selectedChannels,
        selectedSurveys
      )

      pys = await getNpsScore(
        moment(actualMonth.startDate).subtract(1, 'year').startOf('month'),
        moment(actualMonth.startDate).subtract(1, 'year').endOf('month'),
        selectedEvaluationGroups,
        selectedChannels,
        selectedSurveys
      )
    }
    setScores({
      actualMonth: {
        score: ams.data.avgScore,
        qty: ams.data.count,
        label: actualMonth.label
      },
      prevYear: {
        score: pys.data.avgScore,
        qty: pys.data.count,
        label: moment(actualMonth.startDate).subtract(1, 'year').format('MMMM YYYY')
      }
    })
  }

  useEffect(() => {
    if (selectedEvaluationGroups.length > 0 && selectedSurveys.length > 0) callService()
    //eslint-disable-next-line
  }, [actualMonth, selectedSurveys, selectedEvaluationGroups, selectedChannels])

  return <MonthlyScoreCards scores={scores} scoreType={type} />
}

export default MonthlyScores
