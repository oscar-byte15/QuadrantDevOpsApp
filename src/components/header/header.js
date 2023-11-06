import React, { forwardRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { menuToggle } from '../../redux/actions/menu/actionDispatcher'
import {
  useTheme,
  AppBar,
  Toolbar,
  IconButton,
  Stack,
  Box,
  Dialog,
  DialogTitle,
  Slide,
  Button,
  Chip,
  Typography,
  Divider,
  Link
} from '@mui/material'

import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-toward-subtle.css'

import { getDayparts } from 'services/web_services/dayPart'

import {
  AssignmentTwoTone,
  BookmarkBorderOutlined,
  CalendarMonthTwoTone,
  Close,
  FilterAltOutlined,
  Menu,
  PinDropTwoTone,
  Schedule,
  ScheduleOutlined,
  ScheduleSendTwoTone,
  ScheduleTwoTone
} from '@mui/icons-material'
import { filterToggle } from 'redux/actions/filter/actionDispatcher'
import Iframe from 'react-iframe'
import moment from 'moment'
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function Appbar() {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)
  const menu = useSelector(state => state.menu)
  const mobile = useSelector(state => state.app.isMobile)
  const canFilterByGroup = useSelector(state => state.filter.canFilterByGroup)
  const canFilterBySurvey = useSelector(state => state.filter.canFilterBySurvey)
  const canFilterByDayparts = useSelector(state => state.filter.canFilterByDayparts)

  const theme = useTheme()
  const [open, setOpen] = useState(false)

  const handleOpenDialog = () => {
    setOpen(true)
  }

  const handleCloseDialog = () => {
    setOpen(false)
  }

  const handleDrawerToggle = () => {
    dispatch(menuToggle())
  }

  const handleFilterToggle = () => {
    dispatch(filterToggle())
  }

  const [dayparts, setDayparts] = useState([])

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

        setDayparts(arr)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const dateTimeFormat = new Intl.DateTimeFormat('es-PE', {
    weekday: 'short',
    year: '2-digit',
    month: 'short',
    day: '2-digit'
  })

  return (
    <>
      <AppBar
        position="fixed"
        enableColorOnDark
        color="inherit"
        elevation={0}
        variant="outlined"
        sx={{
          borderTop: '0',
          borderRight: '0',
          borderLeft: '0'
        }}
      >
        <Toolbar sx={{ paddingLeft: { xs: '24px', md: '224px!important' } }}>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: '100%' }}
          >
            <Stack direction="row" spacing={1} alignItems={'center'}>
              <IconButton
                onClick={handleDrawerToggle}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                <Menu color="primary" />
              </IconButton>
              <Tippy
                content="Visita nuestra base de conocimiento"
                placement="bottom-start"
                animation="shift-toward-subtle"
              >
                <IconButton
                  color="inherit"
                  onClick={handleOpenDialog}
                  sx={{ border: '1px solid #E5E8EC', borderRadius: '10px' }}
                >
                  <BookmarkBorderOutlined color="primary" />
                </IconButton>
              </Tippy>
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              alignItems={'center'}
              justifyContent={'space-between'}
              sx={{ flexGrow: '2' }}
            >
              <Box sx={{ display: filter.shouldShow ? 'block' : 'none', width: '100%' }}>
                <SimpleBar autoHide={false}>
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="flex-start"
                    alignItems="stretch"
                    sx={{ padding: '10px 0 12px 0' }}
                    divider={<Divider orientation="vertical" flexItem />}
                  >
                    <Chip
                      onClick={handleFilterToggle}
                      variant="outlined"
                      icon={<CalendarMonthTwoTone fontSize="small" />}
                      sx={{ borderRadius: '8px' }}
                      label={
                        <Typography variant="caption">
                          {filter.startDate.format('ddd, DD MMM YYYY')}
                          {' - '}
                          {filter.endDate.format('ddd, DD MMM YYYY')}
                        </Typography>
                      }
                    />
                    {canFilterByGroup ? (
                      <Chip
                        onClick={handleFilterToggle}
                        variant="outlined"
                        icon={<PinDropTwoTone fontSize="small" />}
                        sx={{ borderRadius: '8px' }}
                        label={
                          <Typography variant="caption">
                            {filter.selectedGroups[0] == 'getAll'
                              ? 'Todos los puntos'
                              : `${filter.selectedGroups.length} puntos`}
                          </Typography>
                        }
                      />
                    ) : (
                      ''
                    )}
                    {canFilterBySurvey ? (
                      <Chip
                        onClick={handleFilterToggle}
                        variant="outlined"
                        icon={<AssignmentTwoTone />}
                        sx={{ borderRadius: '8px' }}
                        label={`${
                          filter.selectedSurveys[0] == 'getAll'
                            ? 'Todas las encuestas'
                            : `${filter.selectedSurveys.length} encuestas`
                        }`}
                      />
                    ) : (
                      ''
                    )}

                    {canFilterByDayparts && dayparts.length > 0 ? (
                      <Chip
                        onClick={handleFilterToggle}
                        variant="outlined"
                        icon={<Schedule fontSize="small" />}
                        sx={{ borderRadius: '8px' }}
                        label={
                          <Typography variant="caption">
                            {filter.selectedDayparts[0] == 'getAll'
                              ? 'Todos los segmentos horarios'
                              : `${filter.selectedDayparts.length} segmentos horarios`}
                          </Typography>
                        }
                      />
                    ) : (
                      ''
                    )}
                  </Stack>
                </SimpleBar>
              </Box>

              <IconButton
                color="primary"
                onClick={handleFilterToggle}
                sx={{
                  border: '1px solid #E5E8EC',
                  borderRadius: '10px',
                  display: filter.shouldShow ? 'flex' : 'none'
                }}
              >
                <FilterAltOutlined />
              </IconButton>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Dialog
        fullScreen
        open={open}
        keepMounted
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
      >
        <DialogTitle sx={{ backgroundColor: '#343434' }}>
          <Stack direction={'row'} justifyContent={'flex-end'}>
            <Button startIcon={<Close />} color="white" onClick={handleCloseDialog}>
              Cerrar
            </Button>
          </Stack>
        </DialogTitle>
        {process.env.REACT_APP_ENV != 'dev' ? (
          <Iframe url="https://quadrant.slite.page/" height="100%" frameBorder={'0'} />
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%'
            }}
          >
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
              Solo disponible en prod
            </Typography>
            <Link href="https://quadrant.slite.page/" target="_blank">
              Abrir wiki en Slite
            </Link>
          </Box>
        )}
      </Dialog>
    </>
  )
}
