import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  ListItemText,
  ListItemIcon
} from '@mui/material'
import { Download, MoreVert, ShowChart } from '@mui/icons-material'

import {
  getDistribution,
  getCsatTrend,
  getNpsTrend,
  getDaypartsTrend
} from 'services/web_services/dashboard'

import { toJpeg } from 'html-to-image'

import GaugeChart from 'components/charts/gaugeChart'
import TrendChart from 'components/charts/trendChart'
import DaypartTrend from './components/daypartTrend'
import { getColor } from 'components/charts/variants/dayparts/colors'

const KPISection = props => {
  const type = props.type.toLowerCase()

  const history = useHistory()
  //const colors = colorsJSON.find(e => e.name == 'multicolor')
  const colors = getColor('multicolor')
  const startDate = useSelector(state => state.filter.startDate)
  const endDate = useSelector(state => state.filter.endDate)
  const selectedGroups = useSelector(state => state.filter.selectedGroups)
  const selectedSurveys = useSelector(state => state.filter.selectedSurveys)
  const selectedChannels = useSelector(state => state.filter.selectedChannels)
  const selectedDayparts = useSelector(state => state.filter.selectedDayparts)

  const openMenu = event => {
    setAnchor(event.currentTarget)
  }

  const createImg = () => {
    const node = document.getElementById('kpi-section')

    const filter = node => {
      if (node.classList === undefined) {
        return true
      } else {
        if (node.classList.contains('no-img-export') === true) {
          return false
        } else {
          return true
        }
      }
    }

    toJpeg(node, {
      filter: filter
    }).then(dataUrl => {
      const link = document.createElement('a')
      link.download = `NPS Trend - ${Date.now()}`
      link.href = dataUrl
      link.click()
      link.remove()
    })
  }

  const [anchor, setAnchor] = useState(null)
  const [answers, setAnswers] = useState(0)
  const [distributionData, setDistributionData] = useState({
    score: 0,
    labels: [],
    series: [],
    loading: false
  })
  const [trendData, setTrendData] = useState({
    data: [],
    loading: false
  })
  const [trendVolume, setTrendVolume] = useState({
    data: [],
    loading: false
  })
  const [daypartData, setDaypartData] = useState({
    data: [],
    loading: false
  })

  const [maxQty, setMaxQty] = useState(0)

  // * PARA DIBUJAR EL PIE
  useEffect(() => {
    const setDist = async () => {
      setDistributionData({ score: 0, series: [], loading: true })

      const chart_data = await getDistribution({
        startDate: startDate.startOf('day').toISOString(),
        endDate: endDate.endOf('day').toISOString(),
        type,
        selectedGroups,
        channel: selectedChannels,
        selectedSurveys,
        dayparts: selectedDayparts
      })
        .then(res => {
          res.data.type = type.toUpperCase()
          return res
        })
        .then(res => {
          setDistributionData({
            score: res.data.score,
            labels:
              res.data.type === 'CSAT'
                ? ['Satisfechos', 'Neutrales', 'Insatisfechos']
                : ['Promotores', 'Neutrales', 'Detractores'],
            series:
              res.data.type === 'CSAT'
                ? [res.data.positive, res.data.neutral, res.data.negative]
                : [res.data.promoter, res.data.neutral, res.data.detractor],
            loading: false
          })
          setAnswers(res.data.length)
        })
      return chart_data
    }
    if (
      startDate != '' ||
      endDate != '' ||
      type != '' ||
      setQty != '' ||
      selectedGroups != '' ||
      selectedSurveys != ''
    ) {
      setDist()
    }
  }, [startDate, endDate, selectedGroups, selectedSurveys, selectedChannels, type])

  // * PARA DIBUJAR EL TREND
  useEffect(() => {
    setTrendData({ data: [], loading: true })
    setTrendVolume({ data: [], loading: true })
    if (props.type === 'NPS') {
      const setTrend = async () => {
        const chart_data = await getNpsTrend({
          startDate: startDate.startOf('day').toISOString(),
          endDate: endDate.endOf('day').toISOString(),
          evaluationGroups: selectedGroups,
          channel: selectedChannels,
          surveys: selectedSurveys,
          dayparts: selectedDayparts
        }).then(res => {
          const data = [
            {
              standard: 'score',
              name: 'NPS',
              type: 'area',
              data: res.data.dataSerie?.map(el => ({ x: el.x, y: el.y })) || []
            }
          ]
          const volume = [
            {
              standard: 'volume',
              name: 'Opiniones',
              type: 'line',
              max: res.data.maxQty,
              data: res.data.dataSerie?.map(el => ({ x: el.x, y: el.qty })) || []
            }
          ]

          setTrendData({ data: data, loading: false })
          setTrendVolume({ data: volume, loading: false })
        })
        return chart_data
      }
      if (startDate != '' || endDate != '' || selectedGroups != '' || selectedSurveys != '') {
        setTrend()
      }
    } else {
      const setTrend = async () => {
        const chart_data = await getCsatTrend({
          startDate: startDate.startOf('day').toISOString(),
          endDate: endDate.endOf('day').toISOString(),
          evaluationGroups: selectedGroups,
          channel: selectedChannels,
          surveys: selectedSurveys,
          dayparts: selectedDayparts
        }).then(res => {
          const data = [
            {
              standard: 'score',
              name: 'CSAT',
              type: 'area',
              data: res.data.dataSerie?.map(el => ({ x: el.x, y: el.y })) || []
            }
          ]
          const volume = [
            {
              standard: 'volume',
              name: 'Opiniones',
              type: 'line',
              max: res.data.maxQty,
              data: res.data.dataSerie?.map(el => ({ x: el.x, y: el.qty })) || []
            }
          ]

          setTrendData({ data: data, loading: false })
          setTrendVolume({ data: volume, loading: false })
        })
        return chart_data
      }
      if (startDate != '' || endDate != '' || selectedGroups != '' || selectedSurveys != '') {
        setTrend()
      }
    }
  }, [startDate, endDate, selectedGroups, selectedSurveys, selectedChannels])

  // * PARA DIBUJAR EL DAYPART
  useEffect(() => {
    setDaypartData({ data: [], loading: true })

    const setTrend = async () => {
      try {
        const res = await getDaypartsTrend({
          startDate: startDate.startOf('day').toISOString(),
          endDate: endDate.endOf('day').toISOString(),
          evaluationGroups: selectedGroups,
          type: type,
          channel: selectedChannels,
          surveys: selectedSurveys,
          dayparts: selectedDayparts
        })

        const updatedData = res.data?.map(daypart => {
          const lowestY = daypart.data?.reduce((acc, curr) => {
            if (curr.y < acc.y) {
              return curr
            } else {
              return acc
            }
          }, daypart.data[0])

          const highestY = daypart.data?.reduce((acc, curr) => {
            if (curr.y > acc.y) {
              return curr
            } else {
              return acc
            }
          }, daypart.data[0])

          return { ...daypart, lowest: lowestY, highest: highestY, kpi: type }
        })

        setDaypartData({
          data: updatedData,
          loading: false
        })
      } catch (error) {
        console.error(error)
      }
    }

    setTrend()
  }, [startDate, endDate, selectedGroups, selectedChannels, selectedSurveys, selectedDayparts])

  return (
    <Card variant="outlined" id="kpi-section">
      <CardHeader
        title={props.type === 'NPS' ? 'Net Promoter Score' : 'Satisfacción General (CSAT)'}
        subheader={answers ? answers + ' respuestas' : ''}
        action={
          <>
            <IconButton onClick={openMenu}>
              <MoreVert />
            </IconButton>
            <Menu
              anchorEl={anchor}
              open={Boolean(anchor)}
              onClose={() => setAnchor(null)}
              keepMounted
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              MenuListProps={{ style: { padding: 0 } }}
              slotProps={{ paper: { sx: { minWidth: 150 } } }}
            >
              <MenuList disablePadding>
                {props.menuLinks?.map(menuLink => {
                  return (
                    <MenuItem onClick={() => history.push(menuLink.src)}>
                      <ListItemIcon>
                        <ShowChart />
                      </ListItemIcon>
                      <ListItemText>{menuLink.name}</ListItemText>
                    </MenuItem>
                  )
                })}

                <MenuItem onClick={createImg}>
                  <ListItemIcon>
                    <Download />
                  </ListItemIcon>
                  <ListItemText>Exportar JPEG</ListItemText>
                </MenuItem>
              </MenuList>
            </Menu>
          </>
        }
      />
      <CardContent style={{ paddingTop: '0' }}>
        <Grid container spacing={2}>
          {props.type === 'NPS' || props.type === 'CSAT' ? (
            <>
              <Grid item xs={12} sm={5} md={4}>
                <GaugeChart
                  score={distributionData?.score}
                  series={distributionData?.series}
                  labels={distributionData?.labels}
                  loading={distributionData?.loading}
                />
              </Grid>
              <Grid item xs={12} sm={7} md={8}>
                <TrendChart
                  trendScore={distributionData?.score}
                  trend={trendData.data}
                  volume={trendVolume.data}
                  maxQty={maxQty}
                  trendLoading={trendData.loading}
                  volumeLoading={trendVolume.loading}
                  gaugeLoading={distributionData?.loading}
                />
              </Grid>
            </>
          ) : (
            ''
          )}
          {daypartData.data.length === 0 ? (
            ''
          ) : (
            <Grid item xs={12}>
              <DaypartTrend daypartData={daypartData} />
            </Grid>
          )}
        </Grid>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  )
}

export default KPISection
