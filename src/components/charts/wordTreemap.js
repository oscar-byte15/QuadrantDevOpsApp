import React, { useEffect, useState } from 'react'
import { Box, CircularProgress, Stack } from '@mui/material'

import Chart from 'react-apexcharts'

const height = 900

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

const WordTreemap = props => {
  const colors = ['#53DD6C', '#FFB703', '#ff7750', '#6b6b6b']
  const series = props.data.data
  const loading = props.data.loading
  const options = {
    chart: {
      type: 'treemap',
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
    plotOptions: {
      treemap: {
        enableShades: false,
        distributed: false,
        useFillColorAsStroke: false
      }
    },
    colors: ['#53DD6C', '#FFB703', '#ff7750', '#6b6b6b'],
    grid: {
      show: true,
      borderColor: '#f3f3f3',
      padding: {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
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
    tooltip: {
      shared: true,
      intersect: false,
      x: {
        show: false
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '16px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        colors: ['#3a3a3a', '#3a3a3a', '#ffffff', '#ffffff']
      },
      dropShadow: {
        enabled: false
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
      opacity: 1
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
      show: false,
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
    },
    xaxis: {
      axisTicks: {
        show: false
      }
    }
  }

  const dateTimeFormat = new Intl.DateTimeFormat('es-PE', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'GMT'
  })

  return (
    <>
      <Stack direction="column" justifyContent={'center'} alignItems={'stretch'} spacing={0}>
        {loading ? (
          <Stack alignItems={'center'}>
            <CircularProgress size={30} />
          </Stack>
        ) : (
          <Box sx={{ width: '100%' }}>
            <Chart type="treemap" options={options} series={series} height={height} />
          </Box>
        )}
      </Stack>
    </>
  )
}

export default WordTreemap
