import React from 'react'
import Chart from 'react-apexcharts'

function CsatDistributionChart(props) {
  const variant = props.variant ? props.variant : 'default'
  const { series } = props
  const transformed = transformDistribution(series, variant)
  return (
    <div style={{ width: '100%' }}>
      <Chart options={csatDistributionChartOptions} series={transformed} type="bar" height="40" />
    </div>
  )
}

export default React.memo(CsatDistributionChart)

// transforms csat distribution to graphics data
const transformDistribution = (distribution, variant) => {
  switch (variant) {
    case 'participants':
      return [
        {
          name: 'Insatisfechos 😠',
          data: [distribution.negative]
        },
        {
          name: 'Neutros 😐',
          data: [distribution.neutral]
        },
        {
          name: 'Satisfechos 😀',
          data: [distribution.positive]
        }
      ]
    case 'opinions':
      return [
        {
          name: 'Negativos 😠',
          data: [distribution.negative]
        },
        {
          name: 'Neutros 😐',
          data: [distribution.neutral]
        },
        {
          name: 'Positivos 😀',
          data: [distribution.positive]
        }
      ]
    default:
      return [
        {
          name: 'Insatisfechos 😠',
          data: [distribution.negative]
        },
        {
          name: 'Neutros 😐',
          data: [distribution.neutral]
        },
        {
          name: 'Satisfechos 😀',
          data: [distribution.positive]
        }
      ]
  }
}

const csatDistributionChartOptions = {
  states: {
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
  chart: {
    type: 'bar',
    height: 160,
    width: '100%',
    stacked: true,
    stackType: '100%',
    toolbar: {
      show: false
    },
    sparkline: {
      enabled: true
    },
    animations: {
      enabled: false
    }
  },
  noData: {
    text: 'No se encuentran respuestas',
    align: 'center',
    verticalAlign: 'middle',
    style: {
      color: '#676767',
      fontSize: '14px'
    }
  },
  plotOptions: {
    bar: {
      barHeight: '100%',
      horizontal: true
    }
  },
  dataLabels: {
    enabled: true,
    dropShadow: {
      enabled: false
    }
  },
  stroke: {
    width: 1
  },
  grid: {
    show: false,
    padding: {
      top: 0,
      bottom: 0,
      right: 0,
      left: 0
    }
  },
  xaxis: {
    categories: [''],
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
  fill: {
    type: 'solid',
    opacity: 1
  },
  legend: {
    show: false,
    showForSingleSeries: false
  },
  colors: ['#e4572e', '#eec643', '#53dd6c'],
  tooltip: {
    followCursor: true,
    x: {
      show: false
    },
    y: {
      formatter: function (val) {
        return val + ' Rptas.'
      }
    }
  }
}
