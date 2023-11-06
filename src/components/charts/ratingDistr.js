import React from 'react'
import Chart from 'react-apexcharts'
import { Box } from '@mui/material'

const RatingDistr = props => {
  const distribution = [
    {
      data: [1380, 690, 400, 0, 448]
    }
  ]

  return <Chart options={getOptions()} series={distribution} type="bar" height={'150px'} />
}
const getOptions = () => {
  return {
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
          enabled: false,
          speed: 50
        }
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: '100%',
        barHeight: '85%'
      }
    },
    xaxis: {
      categories: ['5', '4', '3', '2', '1'],
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      show: true,

      labels: {
        show: true
      }
    },
    fill: {
      opacity: 1
    },
    legend: {
      show: false
    },
    colors: ['#faaf00'],
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
      enabled: true
    },
    stroke: {
      width: 1
    },
    tooltip: {
      enabled: false,
      x: {
        show: true,
        formatter: function (val) {
          if (val == 1) {
            return val + ' estrella'
          } else return val + ' estrellas'
        }
      },
      y: {
        formatter: undefined,
        title: {
          formatter: function (val) {
            return 'Valoraciones:'
          }
        }
      }
    }
  }
}
export default RatingDistr
