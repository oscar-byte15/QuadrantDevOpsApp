import React from 'react'
import Chart from 'react-apexcharts'
import { Typography, Grid, Box, CircularProgress, Stack } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const GaugeChart = props => {
  const { score, series, labels, loading } = props

  const bottom = 50

  const height = '300px'

  const barColor = (score, goal, quantity, loading) => {
    if (quantity == 0 || loading == true) {
      return '#2d2d2d'
    }
    if (goal ? score >= goal : score >= 50) {
      return '#47bb5c '
    }
    if (goal && bottom ? score < goal && score > bottom : score < 50 && score > 10) {
      return '#eec643'
    } else {
      return '#ff7750'
    }
  }

  const options = {
    grid: {
      show: false,
      padding: {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
      }
    },
    chart: {
      type: 'pie',
      // height: 350,
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      },
      animations: {
        enabled: false,
        speed: 150,
        easing: 'easeinout',
        animateGradually: {
          enabled: false
        },
        dynamicAnimation: {
          enabled: true,
          speed: 50
        }
      }
    },
    labels: labels,
    yaxis: {
      show: true,

      labels: {
        show: false
      }
    },
    fill: {
      opacity: 1
    },
    legend: {
      show: false
    },
    colors: ['#47bb5c', '#eec643', '#ff7750'],
    states: {
      normal: {
        filter: {
          type: 'none'
        }
      },
      hover: {
        filter: {
          type: 'none'
        }
      },
      active: {
        filter: {
          type: 'none'
        }
      }
    },
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      // distributed: true,
      // offsetX: 0,
      // offsetY: 0,
      dropShadow: {
        enabled: false
      }
    },
    stroke: {
      width: 1
    },
    tooltip: {
      enabled: true,
      x: {
        show: false
      },
      followCursor: true
    }
  }

  return (
    <Stack
      direction="column"
      justifyContent={'center'}
      alignItems={'stretch'}
      spacing={1}
      sx={{
        height: height,
        backgroundColor: '#ffffff'
      }}
    >
      {loading ? (
        <Stack alignItems={'center'}>
          <CircularProgress size={30} />
        </Stack>
      ) : (
        <>
          <Chart
            options={options}
            series={series}
            labels={labels}
            type="pie"
            // height={useMediaQuery(theme.breakpoints.up('sm')) ? '180px' : '200px'}
            height={250}
          />
          <Typography
            align="center"
            sx={{
              color: barColor(score),
              lineHeight: '1',
              fontWeight: '700',
              fontSize: ' 2.4rem',
              fontFamily: '"Roboto", sans-serif'
            }}
          >
            {score}
          </Typography>
        </>
      )}
    </Stack>
  )
}

export default GaugeChart
