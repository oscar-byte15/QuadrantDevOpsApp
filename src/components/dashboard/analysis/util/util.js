export const transformCsatDistributionToGraphicData = distribution => {
  return [
    {
      name: 'Insatisfecho 😠',
      data: [distribution.negative]
    },
    {
      name: 'Neutro 😐',
      data: [distribution.neutral]
    },
    {
      name: 'Satisfecho 😀',
      data: [distribution.positive]
    }
  ]
}

export const getCsatGraphicConf = () => {
  return {
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
        enabled: true,
        easing: 'easeinout',
        speed: 300,
        animateGradually: {
          enabled: true
        }
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
}
export const getNpsGraphicConf = () => {
  return {
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
        enabled: true,
        easing: 'easeinout',
        speed: 300,
        animateGradually: {
          enabled: true
        }
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
    colors: [
      '#e45d2e',
      '#e3752f',
      '#e28b30',
      '#e49f33',
      '#e9b43b',
      '#ebc744',
      '#d3ce49',
      '#b9d64f',
      '#9edb56',
      '#7fdc5f',
      '#5bdd6a'
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
    }
  }
}
