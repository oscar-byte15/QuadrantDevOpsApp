import {
  Grid,
  Stack,
  Card,
  CardHeader,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getSummaryCardsInfo } from 'services/web_services/dashboard'
import Summary from '../../../common/quadrantComponents/SummaryCard'
import CommentSummary from 'components/common/quadrantComponents/CommentSummary'

import { toJpeg } from 'html-to-image'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import moment from 'moment'
import { Download, MoreVert, ShowChart } from '@mui/icons-material'
import { sum } from 'lodash'

const SummarySection = _ => {
  const startDate = useSelector(state => state.filter.startDate)
  const endDate = useSelector(state => state.filter.endDate)
  const selectedGroups = useSelector(state => state.filter.selectedGroups)
  const selectedSurveys = useSelector(state => state.filter.selectedSurveys)
  const selectedChannels = useSelector(state => state.filter.selectedChannels)
  const selectedDayparts = useSelector(state => state.filter.selectedDayparts)

  const [summaryData, setSummaryData] = useState({ data: '', loading: false })

  const [anchor, setAnchor] = useState(null)
  const openMenu = event => {
    setAnchor(event.currentTarget)
  }

  const createImg = () => {
    const node = document.getElementById('summary-section')

    const filter = node => {
      if (node.classList === undefined) {
        return true
      } else {
        if (node.classList.contains('no-img-export') === true) {
          return false
        } else {
          return true
        }
      }
    }
    toJpeg(node, {
      filter: filter
    }).then(dataUrl => {
      const link = document.createElement('a')
      link.download = `Experience Summary - ${Date.now()}`
      link.href = dataUrl
      link.click()
      link.remove()
    })
  }

  useEffect(() => {
    setSummaryData(prevState => ({ ...prevState, loading: true }))

    let period = moment(endDate.endOf('day')).diff(moment(startDate.startOf('day')), 'days')

    const startComparisonDate = moment(startDate).subtract(period, 'days')
    const endComparisonDate = moment(endDate).subtract(period, 'days')

    const getSummaryData = async (startDate, endDate) => {
      try {
        const summaryData = await getSummaryCardsInfo({
          startDate: startDate.startOf('day').toISOString(),
          endDate: endDate.endOf('day').toISOString(),
          evaluationGroups: selectedGroups,
          channel: selectedChannels,
          surveys: selectedSurveys,
          dayparts: selectedDayparts
        })

        return {
          npsScore: summaryData.data.npsScore,
          npsQty: summaryData.data.npsQty,
          csatScore: summaryData.data.csatScore,
          csatQty: summaryData.data.csatQty,
          othersQty: summaryData.data.othersQty,
          congratulationQty: summaryData.data.congratulationQty,
          suggestionQty: summaryData.data.suggestionQty,
          complaintQty: summaryData.data.complaintQty,
          generalQty: summaryData.data.generalQty,
          commentsQty: summaryData.data.commentsQty,
          totalQty: summaryData.data.totalQty
        }
      } catch (err) {
        // console.log(err)
        return null
      }
    }

    const fetchSummaryData = async () => {
      const summary1 = await getSummaryData(startDate, endDate)
      const summary2 = await getSummaryData(startComparisonDate, endComparisonDate)

      if (summary1 && summary2) {
        // Combine the summary data from both responses
        const combinedSummary = {
          data: [
            {
              type: 'Total',
              score: '-',
              now: {
                quantity: summary1.totalQty,
                startDate: startDate.format('DD/MM/YY'),
                endDate: endDate.format('DD/MM/YY')
              },
              before: {
                quantity: summary2.totalQty,
                startDate: startComparisonDate.format('DD/MM/YY'),
                endDate: endComparisonDate.format('DD/MM/YY')
              }
            },
            {
              type: 'NPS',
              now: {
                score: summary1.npsScore,
                quantity: summary1.npsQty,
                startDate: startDate.format('DD/MM/YY'),
                endDate: endDate.format('DD/MM/YY')
              },
              before: {
                score: summary2.npsScore,
                quantity: summary2.npsQty,
                startDate: startComparisonDate.format('DD/MM/YY'),
                endDate: endComparisonDate.format('DD/MM/YY')
              },
              diff: {
                score: summary1.npsScore / summary2.npsScore,
                quantity: summary1.npsQty / summary2.npsQty
              }
            },
            {
              type: 'CSAT',
              now: {
                score: summary1.csatScore,
                quantity: summary1.csatQty,
                startDate: startDate.format('DD/MM/YY'),
                endDate: endDate.format('DD/MM/YY')
              },
              before: {
                score: summary2.csatScore,
                quantity: summary2.csatQty,
                startDate: startComparisonDate.format('DD/MM/YY'),
                endDate: startComparisonDate.format('DD/MM/YY')
              },
              diff: {
                score: summary1.csatScore / summary2.csatScore,
                quantity: summary1.csatQty / summary2.csatQty
              }
            },
            {
              type: 'Otros',
              score: '-',
              now: {
                quantity: summary1.othersQty,
                startDate: startDate.format('DD/MM/YY'),
                endDate: endDate.format('DD/MM/YY')
              },
              before: {
                quantity: summary2.othersQty,
                startDate: startComparisonDate.format('DD/MM/YY'),
                endDate: startComparisonDate.format('DD/MM/YY')
              },
              diff: {
                quantity: summary1.othersQty / summary2.othersQty
              }
            },
            {
              type: 'Comentarios',
              score: '-',
              now: {
                quantity: summary1.commentsQty,
                startDate: startDate.format('DD/MM/YY'),
                endDate: endDate.format('DD/MM/YY'),
                congratulations: {
                  quantity: summary1.congratulationQty,
                  share: (summary1.congratulationQty / summary1.commentsQty) * 100
                },
                suggestions: {
                  quantity: summary1.suggestionQty,
                  share: (summary1.suggestionQty / summary1.commentsQty) * 100
                },
                complaints: {
                  quantity: summary1.complaintQty,
                  share: (summary1.complaintQty / summary1.commentsQty) * 100
                },
                general: {
                  quantity: summary1.generalQty,
                  share: (summary1.generalQty / summary1.commentsQty) * 100
                }
              },
              before: {
                quantity: summary2.commentsQty,
                startDate: startComparisonDate.format('DD/MM/YY'),
                endDate: startComparisonDate.format('DD/MM/YY'),
                congratulations: {
                  quantity: summary2.congratulationQty,
                  share: (summary2.congratulationQty / summary2.commentsQty) * 100
                },
                suggestions: {
                  quantity: summary2.suggestionQty,
                  share: (summary2.suggestionQty / summary2.commentsQty) * 100
                },
                complaints: {
                  quantity: summary2.complaintQty,
                  share: (summary2.complaintQty / summary2.commentsQty) * 100
                },
                general: {
                  quantity: summary2.generalQty,
                  share: (summary2.generalQty / summary2.commentsQty) * 100
                }
              },
              diff: {
                quantity: summary1.commentsQty / summary2.commentsQty,
                congratulations: summary1.congratulationQty / summary2.congratulationQty,
                suggestions: summary1.suggestionQty / summary2.suggestionQty,
                complaints: summary1.complaintQty / summary2.complaintQty,
                general: summary1.generalQty / summary2.generalQty
              }
            }
          ],
          loading: false
        }

        setSummaryData(combinedSummary)
      } else {
        setSummaryData({ data: [], loading: false })
      }
    }

    fetchSummaryData()
  }, [startDate, endDate, selectedGroups, selectedSurveys, selectedChannels, selectedDayparts])

  const periodsData = summaryData.periods && summaryData.periods
  const npsData = summaryData.data && summaryData.data.filter(item => item.type === 'NPS')[0]
  const csatData = summaryData.data && summaryData.data.filter(item => item.type === 'CSAT')[0]
  const othersData = summaryData.data && summaryData.data.filter(item => item.type === 'Otros')[0]
  const totalData = summaryData.data && summaryData.data.filter(item => item.type === 'Total')[0]

  const commentsData =
    summaryData.data && summaryData.data.filter(item => item.type === 'Comentarios')[0]

  return (
    <>
      <Card variant="outlined" id="summary-section">
        <CardHeader
          title="Resumen"
          subheader={
            summaryData.loading
              ? 'cargando...'
              : totalData.now?.quantity
              ? totalData.now?.quantity + ' respuestas totales'
              : 'No hay datos'
          }
          action={
            <>
              <IconButton onClick={openMenu}>
                <MoreVert />
              </IconButton>
              <Menu
                anchorEl={anchor}
                open={Boolean(anchor)}
                onClose={() => setAnchor(null)}
                keepMounted
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                MenuListProps={{ style: { padding: 0 } }}
                slotProps={{ paper: { sx: { minWidth: 150 } } }}
              >
                <MenuList disablePadding>
                  <MenuItem onClick={createImg}>
                    <ListItemIcon>
                      <Download />
                    </ListItemIcon>
                    <ListItemText>Exportar JPEG</ListItemText>
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          }
        />
        <CardContent>
          <SimpleBar autoHide={false}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1}
              sx={{ width: { xs: '100%', sm: 'fit-content' }, padding: '15px 0' }}
            >
              <Summary data={npsData} loading={summaryData.loading} />
              <Summary data={csatData} loading={summaryData.loading} />
              {Boolean(othersData.quantity?.values[0] || othersData.quantity?.values[1]) ? (
                <Summary data={othersData} loading={summaryData.loading} />
              ) : (
                ''
              )}
              <CommentSummary data={commentsData} loading={summaryData.loading} />
            </Stack>
          </SimpleBar>
        </CardContent>
      </Card>
    </>
  )
}

export default SummarySection
