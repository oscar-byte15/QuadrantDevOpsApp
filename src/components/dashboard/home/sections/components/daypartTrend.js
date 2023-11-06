import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Box,
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Stack,
  Switch,
  FormControlLabel,
  Divider,
  Typography,
  List,
  ListItem,
  CircularProgress
} from '@mui/material'

import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

import DaypartTrendChart from 'components/charts/variants/dayparts/DaypartTrendChart'

import 'simplebar-react/dist/simplebar.min.css'
import { getColor } from 'components/charts/variants/dayparts/colors.js'
import moment from 'moment'

const DaypartTrend = props => {
  const data = props.daypartData.data
  const loading = props.daypartData.loading

  const [dayPartView, setDaypartView] = useState(false)

  const colors = getColor('multicolor')

  const meaningfulDaypartData = data?.filter(e => e.data.length != 0)

  return meaningfulDaypartData.length == 0 ? (
    ''
  ) : (
    <>
      <CardHeader
        title="Segmentación horaria"
        action={
          <FormControlLabel
            control={
              <Switch
                size="small"
                color="primary"
                checked={dayPartView}
                onClick={() => {
                  dayPartView === false ? setDaypartView(true) : setDaypartView(false)
                }}
              />
            }
            label="Comparativa"
            labelPlacement="end"
          />
        }
      />
      <CardContent>
        {loading ? (
          <Box
            sx={{
              height: '350px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <CircularProgress size={25} />
          </Box>
        ) : (
          <Stack spacing={1}>
            {data && dayPartView ? (
              <DaypartTrendChart series={meaningfulDaypartData} colors={colors} />
            ) : (
              <SimpleBar autoHide={false}>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={1}
                  sx={{ paddingBottom: '12px' }}
                  divider={<Divider orientation="vertical" flexItem />}
                >
                  {meaningfulDaypartData.map((daypart, index) => {
                    return (
                      <Box
                        key={index}
                        sx={{
                          width:
                            meaningfulDaypartData.length == 2
                              ? { xs: '100%', sm: '50%' }
                              : meaningfulDaypartData.length >= 3
                              ? { xs: '100%', sm: '33.33%' }
                              : '100%',
                          minWidth: '30%'
                        }}
                      >
                        <CardHeader sx={{ textTransform: 'capitalize' }} title={daypart.name} />
                        <CardContent>
                          <DaypartTrendChart series={[daypart]} colors={[colors[index]]} />
                          <Box>
                            <List>
                              <ListItem
                                secondaryAction={
                                  <Typography>
                                    {moment(daypart.highest.x).format('ddd DD MMM YY')}
                                  </Typography>
                                }
                              >
                                <Typography
                                  sx={{
                                    fontFamily: 'Archivo Variable',
                                    fontWeight: '600'
                                  }}
                                >
                                  Mejor día: ({daypart.highest.y})
                                </Typography>
                              </ListItem>
                              <ListItem
                                secondaryAction={
                                  <Typography>
                                    {moment(daypart.lowest.x).format('ddd DD MMM YY')}
                                  </Typography>
                                }
                              >
                                <Typography
                                  sx={{
                                    fontFamily: 'Archivo Variable',
                                    fontWeight: '600'
                                  }}
                                >
                                  Peor día: ({daypart.lowest.y})
                                </Typography>
                              </ListItem>
                              {/* <ListItem secondaryAction={<Typography>3 días</Typography>}>
                                <Typography
                                  sx={{
                                    fontFamily: 'Archivo Variable',
                                    fontWeight: '600'
                                  }}
                                >
                                  Mejor racha:
                                </Typography>
                              </ListItem> */}
                            </List>
                          </Box>
                        </CardContent>
                      </Box>
                    )
                  })}
                </Stack>
              </SimpleBar>
            )}
          </Stack>
        )}
      </CardContent>
    </>
  )
}

export default DaypartTrend
