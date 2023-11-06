import React, { useEffect, useState } from 'react'
import { Box, CircularProgress, Stack, Typography } from '@mui/material'

import Chart from 'react-apexcharts'

const height = 160

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

const defaultOptions = {
  chart: {
    type: 'line',
    defaultLocale: 'es',
    locales: [es],
    background: 'white',
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
      show: false,
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
  tooltip: {
    // custom: ({ dataPointIndex }) => tooltip(dataPointIndex),
    shared: true,
    intersect: false,
    x: {
      show: true
    }
  },
  dataLabels: {
    enabled: false
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
    opacity: [0.5]
  },
  stroke: {
    width: 2,
    curve: 'smooth'
  },
  markers: {
    size: 2,
    strokeWidth: 0,
    showNullDataPoints: false,
    hover: {
      sizeOffset: 0
    }
  },
  yaxis: {
    show: true,
    showAlways: true,
    forceNiceScale: true,
    opposite: false,
    max: 100,
    min: -100,
    labels: {
      minWidth: 40
    },
    axisTicks: {
      show: false
    },
    axisBorder: {
      show: false
    },
    crosshairs: {
      show: false
    },
    tooltip: {
      enabled: false
    }
  }
}

const TrendChart = props => {
  const { trend, volume, trendLoading, volumeLoading, trendScore, gaugeLoading } = props

  const [groupId, setGroupId] = useState((Math.random() + 1).toString(36).substring(7))

  const [scoreSeries, setScoreSeries] = useState([])
  const [volumeSeries, setVolumeSeries] = useState([])
  const [scoreOptions, setScoreOptions] = useState(defaultOptions)
  const [volumeOptions, setVolumeOptions] = useState(defaultOptions)

  const [loading, setLoading] = useState(false)

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

  const tooltip = index => {
    const getSquare = i => `<div style="background: ${colors[i]};" class="box-6px"></div>`

    const getInfo = (type, value) => `<span>&nbsp ${type + ': ' + value.y}</span>`

    const getDateLabel = (dateStr = '') =>
      `<span class="tooltip-dateLabel">${dateTimeFormat.format(new Date(dateStr))}</span>`

    let tooltipBody = trend.map((serie, i) => {
      return serie.data[index].y === null
        ? `${i === 0 ? getDateLabel(serie.data[index].x) : ''} `
        : `${i === 0 ? getDateLabel(serie.data[index].x) : ''}
          <div class="tooltip-info">
            ${getSquare(i)}
            ${getInfo(serie.name, serie.data[index])}
          </div>`
    })
    return `<div class='custom-tooltip'>${tooltipBody.join('')}</div>`
  }

  useEffect(() => {
    setLoading(Boolean(trendLoading || volumeLoading || gaugeLoading))
  }, [trendLoading, volumeLoading, gaugeLoading])

  useEffect(() => {
    trend.map((serie, index) => {
      setScoreSeries([
        {
          standard: serie.standard,
          name: serie.name,
          type: serie.type,
          data: serie.data
        }
      ])

      setScoreOptions(prevState => ({
        ...prevState,
        chart: {
          ...prevState.chart,
          id: serie.type + serie.name + groupId,
          group: groupId,
          type: serie.type
        },
        colors: [colors[0]],
        tooltip: {
          ...prevState.tooltip,
          x: {
            formatter: date => {
              return dateTimeFormat.format(new Date(date))
            }
          }
        },
        yaxis: {
          ...prevState.yaxis,
          seriesName: serie.standard
        },
        annotations: {
          yaxis: [
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
                  // fontFamily: undefined
                }
              }
            },
            {
              y: trendScore,
              yAxisIndex: 0,
              strokeDashArray: 0,
              borderColor: '#c2c2c2',
              opacity: 1,
              width: '100%',
              label: {
                borderColor: '#c2c2c2',
                borderWidth: 0.2,
                borderRadius: 2,
                text: serie.name + ': ' + trendScore,
                textAnchor: 'end',
                position: 'right',
                style: {
                  background: '#fff',
                  color: '#777',
                  fontSize: '12px',
                  fontWeight: 400
                }
              }
            }
          ]
        }
      }))
    })
  }, [trend, trendScore])

  useEffect(() => {
    volume.map((serie, index) => {
      setVolumeSeries([
        {
          standard: serie.standard,
          name: serie.name,
          type: serie.type,
          data: serie.data
        }
      ])

      setVolumeOptions(prevState => ({
        ...prevState,
        chart: {
          ...prevState.chart,
          id: serie.type + serie.name + groupId,
          group: groupId,
          type: serie.type
        },
        colors: [colors[1]],
        tooltip: {
          ...prevState.tooltip,
          x: {
            show: true,
            formatter: date => {
              return dateTimeFormat.format(new Date(date))
            }
          }
        },
        yaxis: {
          ...prevState.yaxis,
          seriesName: serie.standard,
          max: serie.max,
          min: 0
        },
        annotations: {
          yaxis: [
            {
              y: serie.max,
              yAxisIndex: 0,
              strokeDashArray: 0,
              borderColor: '#c2c2c2',
              opacity: 1,
              width: '100%',
              label: {
                borderColor: '#c2c2c2',
                borderWidth: 0.2,
                borderRadius: 2,
                text: 'Max: ' + serie.max,
                textAnchor: 'end',
                position: 'right',
                style: {
                  background: '#fff',
                  color: '#777',
                  fontSize: '12px',
                  fontWeight: 400
                  // fontFamily: undefined
                }
              }
            }
          ]
        }
      }))
    })
  }, [volume])

  return (
    <>
      <Stack
        direction="column"
        justifyContent={'center'}
        alignItems={'stretch'}
        spacing={0}
        sx={{
          height: `${height * 2}px`,
          backgroundColor: '#ffffff'
        }}
      >
        {loading ? (
          <Stack alignItems={'center'}>
            <CircularProgress size={30} />
          </Stack>
        ) : (
          <>
            <Box sx={{ position: 'relative' }}>
              <Typography
                sx={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  zIndex: '1',
                  fontWeight: '500',
                  fontFamily: 'Archivo Variable'
                }}
              >
                Score
              </Typography>
              <Chart
                type={trend.type}
                options={scoreOptions}
                series={scoreSeries}
                width={'100%'}
                height={height}
              />
            </Box>
            <Box sx={{ position: 'relative' }}>
              <Typography
                sx={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  zIndex: '1',
                  fontWeight: '500',
                  fontFamily: 'Archivo Variable'
                }}
              >
                Cantidad
              </Typography>
              <Chart
                type={volume.type}
                options={volumeOptions}
                series={volumeSeries}
                width={'100%'}
                height={height}
              />
            </Box>
          </>
        )}
      </Stack>
    </>
  )
}

export default TrendChart
