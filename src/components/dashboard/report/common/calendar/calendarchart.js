import React, { Component } from 'react'
import Chart from 'react-apexcharts'

export default class ApexChart extends Component {
  constructor(props) {
    super(props)
    this.tooltip = this.tooltip.bind(this)
    this.state = {
      options: {
        chart: {
          type: 'heatmap',
          toolbar: {
            show: false
          },
          sparkline: {
            enabled: false
          },
          animations: {
            enabled: false,
            speed: 200,
            animateGradually: {
              enabled: false
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
          show: false,
          padding: {
            top: 0,
            bottom: 0
          }
        },
        labels: ['lu', 'ma', 'mi', 'ju', 'vi', 'sa', 'do'],
        legend: {
          show: false
        },
        dataLabels: {
          enabled: true,
          style: {
            colors: [
              // function ({series, seriesIndex, dataPointIndex}) {
              //   if (series[seriesIndex][dataPointIndex] === 777) return '#FFFFFF'
              //   else return '#ffffff'
              // }
              '#ffffff'
            ]
          }
        },
        plotOptions: {
          heatmap: {
            radius: 2,
            enableShades: true,
            shadeIntensity: 0,
            reverseNegativeShade: true,
            inverse: true,
            colorScale: {
              ranges: [
                {
                  from: -100,
                  to: -93,
                  color: '#E45C2E'
                },
                {
                  from: -92,
                  to: -85,
                  color: '#E4662E'
                },
                {
                  from: -84,
                  to: -77,
                  color: '#E3702F'
                },
                {
                  from: -76,
                  to: -69,
                  color: '#E3782F'
                },
                {
                  from: -68,
                  to: -61,
                  color: '#E3812F'
                },
                {
                  from: -60,
                  to: -53,
                  color: '#E28C30'
                },
                {
                  from: -52,
                  to: -45,
                  color: '#E29630'
                },
                {
                  from: -44,
                  to: -37,
                  color: '#E39D32'
                },
                {
                  from: -36,
                  to: -29,
                  color: '#E5A435'
                },
                {
                  from: -28,
                  to: -21,
                  color: '#E7AD38'
                },
                {
                  from: -20,
                  to: -13,
                  color: '#EAB53C'
                },
                {
                  from: -12,
                  to: -5,
                  color: '#ECBD3F'
                },
                {
                  from: -4,
                  to: 4,
                  color: '#EBC744'
                },
                {
                  from: 5,
                  to: 12,
                  color: '#E3C946'
                },
                {
                  from: 13,
                  to: 20,
                  color: '#D8CC48'
                },
                {
                  from: 21,
                  to: 28,
                  color: '#CCD04B'
                },
                {
                  from: 29,
                  to: 36,
                  color: '#C4D24C'
                },
                {
                  from: 37,
                  to: 44,
                  color: '#B4D750'
                },
                {
                  from: 45,
                  to: 52,
                  color: '#AED951'
                },
                {
                  from: 53,
                  to: 60,
                  color: '#9FDB55'
                },
                {
                  from: 61,
                  to: 68,
                  color: '#94DB59'
                },
                {
                  from: 69,
                  to: 76,
                  color: '#85DC5D'
                },
                {
                  from: 77,
                  to: 84,
                  color: '#75DC62'
                },
                {
                  from: 85,
                  to: 92,
                  color: '#69DC65'
                },
                {
                  from: 93,
                  to: 100,
                  color: '#58DD6A'
                },

                {
                  from: 777,
                  to: 777,
                  color: '#ffffff'
                }
              ]
            },
            min: -100,
            max: 100
          }
        },
        yaxis: {
          show: false
        },
        xaxis: {
          position: 'top',
          labels: {
            show: true,
            style: {
              colors: '#2d2d2d'
            }
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
          tooltip: {
            enabled: false
          }
        },
        tooltip: {
          enabled: true,
          x: {
            show: true
          },
          followCursor: true,
          custom: ({ series, seriesIndex, dataPointIndex }) =>
            this.tooltip(series, seriesIndex, dataPointIndex)
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
  }

  tooltip(series, seriesIndex, index) {
    let data = this.props.data[seriesIndex].data[index]
    if (data.y === 777) return null
    let tooltipBody = `
      <span class='tooltip-dateLabel'> ${data.x}</span> <br> 
     <div class="tooltip-info">
          <span> Score: ${data.y}</span>
      </div>
     <div class="tooltip-info">
          <span> Repuestas: ${data.qty}</span>
      </div>
      `

    return `<div class='custom-tooltip'>${tooltipBody}</div>`
  }
  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.props.data}
        type="heatmap"
        width={'100%'}
        height={'300px'}
      />
    )
  }
}
