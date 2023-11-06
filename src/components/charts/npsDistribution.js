import React, { useEffect } from 'react'
import Chart from 'react-apexcharts'

function NpsDistributionChart(props) {
  const { series } = props
  const simplifiedSeries = [
    { name: 'detractors', data: [] },
    { name: 'neutrals', data: [] },
    { name: 'promoters', data: [] }
  ]

  return (
    <div style={{ width: '100%' }}>
      <Chart options={npsDistributionChartOptions} series={series} type="bar" height={40} />
    </div>
  )
}

export default React.memo(NpsDistributionChart)

const npsDistributionChartOptions = {
  chart: {
    type: 'bar',
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
  // colors: [
  //   '#e45d2e',
  //   '#e3752f',
  //   '#e28b30',
  //   '#e49f33',
  //   '#e9b43b',
  //   '#ebc744',
  //   '#d3ce49',
  //   '#b9d64f',
  //   '#9edb56',
  //   '#7fdc5f',
  //   '#5bdd6a'
  // ],
  colors: [
    '#e4572e',
    '#e4572e',
    '#e4572e',
    '#e4572e',
    '#e4572e',
    '#e4572e',
    '#e4572e',
    '#eec643',
    '#eec643',
    '#53dd6c',
    '#53dd6c'
  ],
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
  },
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
  }
}
