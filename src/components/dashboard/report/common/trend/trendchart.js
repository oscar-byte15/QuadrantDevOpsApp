import React, { Component } from 'react'
import Chart from 'react-apexcharts'
import _ from 'lodash'
import { es } from 'components/charts/config'

export default class ApexChart extends Component {
  constructor(props) {
    super(props)
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
        sparkline: {
          enabled: false
        },
        zoom: {
          enabled: false
        },
        background: 'white',
        toolbar: {
          show: false
        },
        animations: {
          enabled: false,
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
          show: true,
          datetimeFormatter: {
            year: '',
            month: '',
            day: 'dd/MM',
            hour: ''
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
          format: 'dd MMMM'
        }
      },

      legend: {
        show: true,
        horizontalAlign: 'left',
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
  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.props.data.series}
        type="line"
        {...this.props.chartProps}
      />
    )
  }
}
