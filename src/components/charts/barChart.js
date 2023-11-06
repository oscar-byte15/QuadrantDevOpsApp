import React from 'react'
import Chart from 'react-apexcharts'

var barChartOptions = {
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
      // enabled: true
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
      // formatter: function (val) {
      //   switch (val) {
      //     case 'Uno':
      //       return 1
      //     case 'Dos':
      //       return 2
      //     case 'Tres':
      //       return 3
      //     case 'Cuatro':
      //       return 4
      //     case 'Cinco':
      //       return 5
      //     default:
      //       return val
      //   }
      // }
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
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
    enabled: true,
    followCursor: true,
    x: {
      show: true,
      formatter: function (val) {
        if (val === 1) {
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
  // xaxis: {categories: []}
}

function BarChart(props) {
  const { data, categories } = props
  const series = [{ data }]
  const options = {
    ...barChartOptions
    // xaxis: {categories}
  }
  return <Chart options={options} series={series} type="bar" height={150} />
}

export default BarChart
