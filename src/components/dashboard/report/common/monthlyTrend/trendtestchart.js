import React, { Component } from 'react'
import Chart from 'react-apexcharts'
import { es } from 'components/charts/config'
import _ from 'lodash'

export default class ApexChart extends Component {
  constructor(props) {
    super(props)
    this.tooltip = this.tooltip.bind(this)
    this.getOptions = this.getOptions.bind(this)
    this.state = {
      options: this.getOptions()
    }
  }

  getOptions(maxQty = 0, labels = 0) {
    return {
      labels: labels ? labels : [],
      chart: {
        locales: [es],
        defaultLocale: 'es',
        zoom: {
          enabled: false
        },
        sparkline: {
          enabled: true
        },
        toolbar: {
          show: false
        },
        animations: {
          enabled: true,
          dynamicAnimation: {
            enabled: true,
            speed: 100
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
      grid: {
        borderColor: '#f6f6f6',
        position: 'back',
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
        row: {
          opacity: 0
        },
        column: {
          opacity: 0
        }
      },
      fill: {
        type: 'solid',
        opacity: 1
      },
      colors: ['#6F6BA3', '#eec643'],
      stroke: {
        width: 3,
        curve: 'straight'
      },
      markers: {
        size: 4,
        hover: {
          sizeOffset: 1
        }
      },
      xaxis: {
        type: 'datetime',
        labels: {
          show: false,
          datetimeFormatter: {
            year: 'yyyy',
            month: 'MMM yy'
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
          show: false
        }
      },
      yaxis: [
        {
          show: false,
          max: 100,
          min: -100
        },
        {
          seriesName: 'Respuestas',
          show: false,
          opposite: true,
          decimalsInFloat: 0,
          tickAmount: 5,
          max: maxQty ? maxQty : 1,
          min: maxQty ? maxQty * -1 : -1,
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
      ],

      tooltip: {
        enabled: true,
        shared: true,
        intersect: false,
        followCursor: true,
        x: {
          show: true,
          format: 'MMMM yyyy'
        }
      },
      legend: {
        show: false
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
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.data.series, this.props.data.series)) {
      this.setState({
        options: this.getOptions(this.props.data.maxQty, this.props.data.labels)
      })
    }
  }

  tooltip(series, seriesIndex, dataPointIndex) {
    return null
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.props.data.series}
        type="line"
        width={'100%'}
        height={'100%'}
      />
    )
  }
}
