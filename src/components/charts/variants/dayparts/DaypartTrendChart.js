import React, { Component, useEffect, useState } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

import Chart from 'react-apexcharts'

const es = {
  name: 'es',
  options: {
    months: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ],
    shortMonths: [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic'
    ],
    days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    shortDays: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    toolbar: {
      exportToSVG: 'Descargar SVG',
      exportToPNG: 'Descargar PNG',
      exportToCSV: 'Descargar CSV',
      menu: 'Menu',
      selection: 'Seleccionar',
      selectionZoom: 'Seleccionar Zoom',
      zoomIn: 'Aumentar',
      zoomOut: 'Disminuir',
      pan: 'Navegación',
      reset: 'Reiniciar Zoom'
    }
  }
}

const Trend = props => {
  const [axis, setAxis] = useState([])
  const [series, setSeries] = useState([])
  const [yAnnotations, setYAnnotations] = useState([])

  const dateTimeFormat = new Intl.DateTimeFormat('es-PE', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'GMT'
  })

  const colors = props.colors
    ? props.colors
    : ['#8AC8E5', '#FFB703', '#53DD6C', '#403D58', '#F497DA']

  useEffect(() => {
    let axisData = []
    let seriesData = []
    let yAnnotationsData = [
      {
        y: 0,
        yAxisIndex: 0,
        strokeDashArray: 0,
        borderColor: '#e7e7e7',
        opacity: 1,
        width: '100%',
        label: {
          borderWidth: 0,
          borderRadius: '100%',
          text: '0',
          position: 'right',
          textAnchor: 'end',
          offsetY: 7,
          style: {
            background: 'white',
            color: '#777',
            fontSize: '12px',
            fontWeight: 400
          }
        }
      }
    ]

    props.series.map((axis, index) => {
      seriesData.push(axis)
      axisData.push({
        seriesName: axis.name,
        show: props.series.length == 1 ? false : index === 0 ? true : false,
        showAlways: true,
        min: -100,
        max: 100,
        tickAmount: 4,
        forceNiceScale: true,
        opposite: index === 0 ? false : true,
        axisTicks: {
          show: false
        },
        axisBorder: {
          show: false,
          color: '#FFB703'
        },
        labels: {
          show: true
        },
        crosshairs: {
          show: false
        }
      })
      yAnnotationsData.push({
        yAxisIndex: index,
        y: axis.score,
        strokeDashArray: 0,
        borderColor: colors[index],
        opacity: 1,
        width: '100%',
        label: {
          borderColor: '#c2c2c2',
          borderWidth: 0,
          borderRadius: 2,
          text: `${props.series.length == 1 ? axis.kpi.toUpperCase() : axis.name}: ${axis.score}`,
          textAnchor: 'end',
          position: 'right',
          offsetX: 0,
          offsetY: 0,
          mouseEnter: undefined,
          mouseLeave: undefined,
          click: undefined,
          style: {
            background: colors[index],
            color: '#2d2d2d',
            fontSize: '12px',
            fontWeight: 600,
            fontFamily: 'Archivo Variable'
          }
        }
      })
    })
    setYAnnotations(yAnnotationsData)
    setAxis(axisData)
    setSeries(seriesData)
  }, [])

  const tooltip = index => {
    const getSquare = i => `<div style="background: ${colors[i]};" class="box-6px"></div>`

    const getInfo = (type, value) => `<span>&nbsp ${type + ': ' + value.y}</span>`

    const dateTimeFormat = new Intl.DateTimeFormat('es-PE', {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'GMT'
    })

    const getDateLabel = (dateStr = '') => {
      return `<span class="tooltip-dateLabel">${dateTimeFormat.format(new Date(dateStr))}</span>`
    }

    let tooltipBody = series.map((serie, i) => {
      return serie.data[index].y === null
        ? `${i === 0 ? getDateLabel(serie.data[index].x) : ''}`
        : `${i === 0 ? getDateLabel(serie.data[index].x) : ''}
          <div class="tooltip-info">
            ${getSquare(i)}
            ${getInfo(serie.name, serie.data[index])}
          </div>`
    })
    return `<div class='custom-tooltip'>${tooltipBody.join('')}</div>`
  }

  const options = {
    chart: {
      locales: [es],
      defaultLocale: 'es',
      background: 'white',
      sparkline: { enabled: props.series.length == 1 ? true : false },
      toolbar: {
        show: false,
        tools: {
          zoom: false
        }
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
    grid: {
      show: true,
      borderColor: '#f3f3f3',
      padding: {
        top: 0,
        bottom: 0,
        right: 10,
        left: 10
      },
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      type: 'datetime',
      labels: {
        show: true,
        datetimeFormatter: {
          year: 'yyyy',
          month: "MMM 'yy"
        }
      },
      tooltip: {
        enabled: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        show: true,
        width: 2,
        opacity: 1,
        stroke: {
          color: '#2d2d2d',
          width: 0,
          dashArray: 0
        },
        fill: {
          type: 'solid'
        }
      }
    },
    colors: colors,
    tooltip: {
      // custom: ({ dataPointIndex }) => tooltip(dataPointIndex),
      shared: true,
      // intersect: true,
      x: {
        show: true,
        formatter: date => {
          return dateTimeFormat.format(new Date(date))
        }
      }
    },
    legend: {
      show: true,
      horizontalAlign: 'left',
      offsetY: 10,
      offsetX: 22,
      markers: {
        radius: 0
      },
      itemMargin: {
        horizontal: 5,
        vertical: 5
      }
    },
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
    fill: {
      type: 'solid',
      opacity: 0.65
    },
    stroke: {
      width: 2,
      curve: 'smooth'
    },
    markers: {
      size: 3,
      strokeWidth: 0,
      showNullDataPoints: false,
      hover: {
        sizeOffset: 0
      }
    },
    yaxis: axis,
    annotations: {
      //   xaxis: [
      //     {
      //       x: new Date('2023-06-15').getTime(),
      //       borderColor: '#00E396',
      //       label: {
      //         borderColor: '#00E396',
      //         orientation: 'vertical',
      //         text: 'Hito 1'
      //       }
      //     }
      //   ],
      yaxis: yAnnotations
    }
  }
  return (
    <Chart
      options={options}
      series={series}
      type={props.series.length == 1 ? 'line' : 'area'}
      height={props.series.length == 1 ? 120 : 350}
    />
  )
}
export default Trend
