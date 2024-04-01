import React, { useEffect } from 'react'
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

import { toJpeg } from 'html-to-image'

import GaugeChart from 'components/charts/gaugeChart'
import TrendChart from 'components/charts/trendChart'
import DaypartTrend from './components/daypartTrend'

const KPISection = props => {
  const type = props.type.toLowerCase()

  const history = useHistory()

  // Datos de demostración para visualización
  const startDate = "2024-03-01T00:00:00.000Z"
  const endDate = "2024-03-31T23:59:59.000Z"
  const selectedGroups = ["Group A", "Group B"]
  const selectedSurveys = ["Survey A", "Survey B"]
  const selectedChannels = ["Channel A", "Channel B"]
  const selectedDayparts = ["Morning", "Afternoon"]

  // Datos de demostración para visualización
  const distributionDataDemo = {
    score: 75,
    labels: ['Promotores', 'Neutrales', 'Detractores'],
    series: [40, 20, 10],
    loading: false
  }

  // Datos de demostración para visualización
  const trendDataDemo = {
    data: [
      {
        standard: 'score',
        name: 'NPS',
        type: 'area',
        data: [{ x: 1, y: 70 }, { x: 2, y: 75 }, { x: 3, y: 80 }, { x: 4, y: 85 }] // Ejemplo de datos de tendencia
      }
    ],
    loading: false
  }

  // Datos de demostración para visualización
  const trendVolumeDemo = {
    data: [
      {
        standard: 'volume',
        name: 'Opiniones',
        type: 'line',
        max: 100,
        data: [{ x: 1, y: 20 }, { x: 2, y: 25 }, { x: 3, y: 30 }, { x: 4, y: 35 }] // Ejemplo de datos de volumen
      }
    ],
    loading: false
  }

  // Datos de demostración para visualización
  const daypartDataDemo = {
    data: [
      {
        daypart: 'Morning',
        data: [
          { x: 'Mon', y: 70 },
          { x: 'Tue', y: 75 },
          { x: 'Wed', y: 80 },
          { x: 'Thu', y: 85 },
          { x: 'Fri', y: 90 },
          { x: 'Sat', y: 95 },
          { x: 'Sun', y: 100 }
        ],
        lowest: { x: 'Tue', y: 75 },
        highest: { x: 'Sun', y: 100 },
        kpi: 'NPS'
      },
      // Más datos de demostración para otros periodos del día...
    ],
    loading: false
  }

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

  const [anchor, setAnchor] = React.useState(null)

  // Simulación de carga de datos
  const [answers, setAnswers] = React.useState(100) // Valor de demostración
  const [distributionData, setDistributionData] = React.useState(distributionDataDemo)
  const [trendData, setTrendData] = React.useState(trendDataDemo)
  const [trendVolume, setTrendVolume] = React.useState(trendVolumeDemo)
  const [daypartData, setDaypartData] = React.useState(daypartDataDemo)
  const [maxQty, setMaxQty] = React.useState(200) // Valor de demostración

  useEffect(() => {
    // Aquí podrías realizar llamadas a API si lo deseas, pero por simplicidad usaremos los datos de demostración.
  }, []) // Usamos un array vacío como dependencia para que se ejecute solo una vez al montar el componente

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
