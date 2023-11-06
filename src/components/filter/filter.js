import React, { useEffect, useState } from 'react'
import httpModule from 'services/httpModule'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeFilterOptions,
  applyFilter,
  clearFilter,
  filterToggle
} from 'redux/actions/filter/actionDispatcher'
import { menuToggle } from '../../redux/actions/menu/actionDispatcher'

import {
  Card,
  CardContent,
  Stack,
  Box,
  AppBar,
  IconButton,
  Button,
  Drawer,
  List,
  SwipeableDrawer,
  Paper,
  ButtonBase,
  ListItem,
  Divider,
  Typography,
  CardHeader,
  Grid,
  Chip
} from '@mui/material'
import moment from 'moment'

import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import { Close, FilterAlt, Menu, TouchApp } from '@mui/icons-material'
import GroupMultiselector from './groupMultiselector'
import SurveyMultiselector from './surveyMultiselector'
import DateRangePicker from 'components/common/dateRangePicker'
import ChannelMultiselector from './channelMultiselector'
import DaypartMultiselector from './daypartMultiselector'

import { getDayparts } from 'services/web_services/dayPart'

const FilterAppBar = () => {
  const state = useSelector(state => state)
  const filter = useSelector(state => state.filter)
  //TODO lista de grupos y encuestas solo debería hacer fetching cuando no es superadmin
  const dispatch = useDispatch()
  const shouldShow = useSelector(state => state.filter.shouldShow)
  const quadrantClient = useSelector(state => state.auth.quadrantClient)
  const [initialRange, setInitialRange] = useState([filter.startDate, filter.endDate])

  const ranges = [
    {
      label: 'Este mes',
      getValue: () => {
        return [moment().startOf('month'), moment().endOf('day')]
      }
    },
    {
      label: 'Mes pasado',
      getValue: () => {
        return [
          moment().subtract(1, 'month').startOf('month'),
          moment().subtract(1, 'month').endOf('month')
        ]
      }
    },

    {
      label: 'Semana pasada',
      getValue: () => {
        return [
          moment().subtract(1, 'week').startOf('week'),
          moment().subtract(1, 'week').endOf('week')
        ]
      }
    },
    {
      label: 'Este año',
      getValue: () => {
        return [moment().startOf('year'), moment()]
      }
    },
    {
      label: 'Año pasado',
      getValue: () => {
        return [
          moment().subtract(1, 'year').startOf('year'),
          moment().subtract(1, 'year').endOf('year')
        ]
      }
    },
    {
      label: 'Desde el inicio',
      getValue: () => {
        return [moment(quadrantClient.createdAt), moment().endOf('day')]
      }
    }
  ]

  const demoRanges = [
    {
      label: 'Demo 2020',
      getValue: () => {
        return [moment('2020-01-01').startOf('month'), moment('2020-03-01').endOf('month')]
      }
    },
    ...ranges
  ]

  const devRanges = [
    {
      label: '2022',
      getValue: () => {
        return [moment('2022-01-01').startOf('month'), moment('2022-12-31').endOf('month')]
      }
    },
    {
      label: 'Sept 2022',
      getValue: () => {
        return [moment('2022-09-01').startOf('month'), moment('2022-09-20').endOf('month')]
      }
    },
    ...demoRanges
  ]

  const shortcuts =
    process.env.REACT_APP_ENV === 'dev'
      ? devRanges
      : quadrantClient.id === '5e18dc455579be3ce00001d1'
      ? demoRanges
      : ranges

  const [selectedPoints, setSelectedPoints] = useState([])
  const [selectedSurveys, setSelectedSurveys] = useState([])
  const [selectedChannels, setSelectedChannels] = useState([])
  const [selectedDayparts, setselectedDayparts] = useState([])

  const [surveys, setSurveys] = useState([])
  const [points, setPoints] = useState([])
  const [dayparts, setDayparts] = useState([])

  const [channels, setChannels] = useState([
    { name: 'Embeded', id: 'CR0A1' },
    { name: 'Tablet', id: 'CR0B2' },
    { name: 'QR', id: 'CR0C3' },
    { name: 'Web', id: 'CR0D4' },
    { name: 'SMS', id: 'CR0E5' },
    { name: 'Email', id: 'CR0F6' },
    { name: 'Whatsapp', id: 'CR0G7' }
  ])

  useEffect(() => {
    httpModule.get('/v1/surveys?select=name').then(({ data }) => {
      setSurveys(data.docs)
      setSelectedSurveys(data.docs)
    })
  }, [])

  useEffect(() => {
    httpModule.get('/v1/evaluationGroups/listEvaluationGroups?select=name').then(({ data }) => {
      setPoints(data.docs)
      setSelectedPoints(data.docs)
    })
  }, [])

  useEffect(() => {
    getDayparts()
      .then(res => {
        const arr = []
        res.data.map(daypart => {
          arr.push({
            name: daypart.name,
            id: daypart.id,
            range: [daypart.startTime, daypart.endTime]
          })
        })

        setselectedDayparts(arr)
        setDayparts(arr)
      })
      .catch(err => {})
  }, [])

  const handleChangeDate = date => {
    setInitialRange(date)
  }

  const handleApplyFilter = () => {
    const [startDate, endDate] = initialRange
    dispatch(
      changeFilterOptions({
        startDate,
        endDate,
        preSelectedChannels: selectedChannels,
        allChannelsSelected: selectedChannels.length === channels.length,
        preSelectedSurveys: selectedSurveys,
        allSurveysSelected: selectedSurveys.length === surveys.length,
        preSelectedGroups: selectedPoints,
        allGroupsSelected: selectedPoints.length === points.length,
        preSelectedDayparts: selectedDayparts,
        allDaypartsSelected: selectedDayparts.length === dayparts.length
      })
    )
    dispatch(applyFilter())
    dispatch(filterToggle())
  }

  const handleChipClick = shortcut => {
    setInitialRange(shortcut.getValue())
  }

  useEffect(() => {
    return () => dispatch(clearFilter())
  }, [dispatch])

  const handleDrawerToggle = () => {
    dispatch(menuToggle())
  }

  const handleFilterToggle = () => {
    dispatch(filterToggle())
  }

  return (
    <Drawer
      variant="temporary"
      anchor={'right'}
      open={filter.open}
      onClose={handleFilterToggle}
      elevation={0}
      ModalProps={{ keepMounted: true }}
      PaperProps={{ sx: { maxWidth: '282px' } }}
    >
      <Stack
        direction="row"
        justifyContent={'flex-end'}
        alignItems={'center'}
        sx={{ paddingLeft: '24px', paddingRight: `${24}px`, height: '64px' }}
      >
        <Button onClick={handleFilterToggle} startIcon={<Close color="primary" />}>
          Cerrar
        </Button>
      </Stack>
      <List sx={{ paddingTop: '13px' }}>
        <CardHeader title="Filtro global" />
        <Divider sx={{ margin: '8px 0px 16px 0px' }} />
        <DateRangePicker
          value={initialRange}
          onChange={handleChangeDate}
          shortcutsList={shortcuts}
        />
        <ListItem>
          <Grid spacing={1} container>
            {shortcuts.map((shortcut, index) => {
              return (
                <Grid item key={index}>
                  <Chip
                    size="small"
                    label={shortcut.label}
                    onClick={() => handleChipClick(shortcut)}
                  />
                </Grid>
              )
            })}
          </Grid>
        </ListItem>
        <GroupMultiselector
          points={points}
          setSelectedPoints={setSelectedPoints}
          selectedPoints={selectedPoints}
        />
        <SurveyMultiselector
          surveys={surveys}
          setSelectedSurveys={setSelectedSurveys}
          selectedSurveys={selectedSurveys}
        />
        {/* <ChannelMultiselector
              setSelectedChannels={setSelectedChannels}
              selectedChannels={selectedChannels}
            /> */}

        <DaypartMultiselector
          dayparts={dayparts}
          setselectedDayparts={setselectedDayparts}
          selectedDayparts={selectedDayparts}
        />
        <ListItem>
          <Button
            fullWidth
            size="medium"
            variant="outlined"
            startIcon={<FilterAlt />}
            color="primary"
            disableElevation
            onClick={handleApplyFilter}
          >
            Aplicar
          </Button>
        </ListItem>
      </List>
    </Drawer>
  )
}
export default FilterAppBar
