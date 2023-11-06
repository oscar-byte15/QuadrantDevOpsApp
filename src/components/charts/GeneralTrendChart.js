import React, { Component } from 'react'
import Chart from 'react-apexcharts'

export default class ApexChart extends Component {
  constructor({ data }) {
    super()
    this.state = {
      options: {
        chart: {
          background: 'white',
          type: 'line',
          toolbar: {
            show: false
          },
          animations: {
            enabled: false,
            easing: 'linear',
            animateGradually: {
              enabled: false
            }
          }
        },
        grid: {
          show: true,
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
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: [3, 3, 3]
        },
        xaxis: {
          type: 'category',
          categories: data.datesSeries,
          labels: {
            show: true,
            rotate: -45,
            rotateAlways: false,
            hideOverlappingLabels: true,
            trim: true
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
          },
          tickPlacement: 'between'
        },
        yaxis: [
          {
            show: true,
            tickAmount: 4,
            forceNiceScale: true,
            seriesName: 'Respuestas',
            opposite: true,
            axisTicks: {
              show: false
            },
            axisBorder: {
              show: false,
              color: '#FEB019'
            },
            labels: {
              show: true,
              style: {
                color: '#00b7d0'
              }
            },
            crosshairs: {
              show: false
            }
          },
          {
            show: true,
            tickAmount: 4,
            min: -100,
            max: 100,
            seriesName: 'CSAT Score',
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
          {
            show: false,
            tickAmount: 4,
            min: -100,
            max: 100,
            seriesName: 'NPS Score',
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
        markers: {
          size: 4,
          hover: {
            size: 5
          }
        },
        colors: ['#00b7d0', '#00d395', '#4d7ebf'],
        tooltip: {
          enabled: true,
          shared: true,
          intersect: false,
          x: {
            show: false
          }
        },
        legend: {
          show: true,
          horizontalAlign: 'left',
          offsetY: -10,
          markers: {
            radius: 0
          },
          itemMargin: {
            horizontal: 5,
            vertical: 10
          }
        },
        states: {
          normal: {
            filter: {
              type: 'none',
              value: 0
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
      },
      series: [
        {
          name: 'Respuestas',
          type: 'line',
          data: data.answerSeries
        },
        {
          name: 'CSAT Score',
          type: 'line',
          data: data.csatSeries
        },
        {
          name: 'NPS Score',
          type: 'line',
          data: data.npsSeries
        }
      ]
    }
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="line"
        width={'100%'}
        height={'100%'}
      />
    )
  }
}
