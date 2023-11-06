import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  Stack
} from '@mui/material'
import moment from 'moment'
import {
  createDayParts as createDayparts,
  deleteDayparts,
  getDayparts
} from 'services/web_services/dayPart'
import Daypart from './common/daypart'

// Inicializar Moment.js con el idioma adecuado
moment.locale('es')

export default function DatePartSettings() {
  const [dayparts, setDayparts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getDayparts()
      .then(res => {
        const daypartsData = []
        res.data.map(daypart => {
          daypartsData.push({
            id: daypart.id,
            name: daypart.name,
            startTime: moment()
              .startOf('day')
              .add(moment(moment.utc(daypart.startTime, 'HH:mm')).local().format('HH:mm')),
            endTime: moment()
              .startOf('day')
              .add(moment(moment.utc(daypart.endTime, 'HH:mm')).local().format('HH:mm'))
          })
        })
        setDayparts(daypartsData)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const handleSaveDayparts = () => {
    setLoading(true)
    const daypartsObject = {
      dayparts: dayparts
        .filter(daypart => daypart.id === undefined)
        .map(daypart => ({
          name: daypart.name,
          startTime: moment(daypart.startTime).utc().format('HH:mm'),
          endTime: moment(daypart.endTime).utc().format('HH:mm')
        }))
    }

    createDayparts(daypartsObject)
      .then(res => {
        res.data.map(daypart => {
          setDayparts(prevDayparts => [
            ...prevDayparts.filter(prevDaypart => prevDaypart.id !== undefined),
            {
              id: daypart.id,
              name: daypart.name,
              startTime: moment()
                .startOf('day')
                .add(moment(moment.utc(daypart.startTime, 'HH:mm')).local().format('HH:mm')),
              endTime: moment()
                .startOf('day')
                .add(moment(moment.utc(daypart.endTime, 'HH:mm')).local().format('HH:mm'))
            }
          ])
        })
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleAddDaypart = () => {
    const newDaypart = {
      name: '',
      startTime: null,
      endTime: null
    }

    setDayparts(prevDayparts => [...prevDayparts, newDaypart])
  }

  const handleDeleteDaypart = (id, index) => {
    setLoading(true)
    const newDayparts = dayparts.filter((daypart, daypartIndex) => daypartIndex != index)

    if (id === undefined) {
      setLoading(false)
      setDayparts(newDayparts)
    } else {
      deleteDayparts(id)
        .then(res => {
          const comps = dayparts.filter(daypart => daypart.id != id)
          setDayparts(comps)
          setLoading(false)
        })
        .catch(err => {
          console.log(err)
          setLoading(false)
        })
    }
  }

  return (
    <Card variant="outlined">
      <CardHeader
        title="Segmentación de horarios"
        subheader="Administra y configura los segmentos horarios de tu organización"
      />
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1}>
            <Typography align="center" sx={{ width: { xs: '55%', sm: '40%' } }}>
              Nombre
            </Typography>
            <Typography align="center" sx={{ width: { xs: '40%', sm: '55%' } }}>
              Rango de horas
            </Typography>
            <Typography align="center" sx={{ width: '5%' }}>
              opc
            </Typography>
          </Stack>
          {dayparts?.map((daypart, index) => (
            <Daypart
              key={daypart.id ? daypart.id : index}
              id={daypart.id}
              index={index}
              daypartName={daypart.name}
              range={[daypart.startTime, daypart.endTime]}
              dayparts={dayparts}
              setDayparts={setDayparts}
              handleDelete={handleDeleteDaypart}
              loading={loading}
            />
          ))}
          <Stack direction="row" justifyContent="flex-end">
            <Button variant="outlined" onClick={handleAddDaypart} disabled={loading}>
              Agregar
            </Button>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions>
        <Box>
          <Button variant="contained" onClick={handleSaveDayparts} disabled={loading}>
            Guardar
          </Button>
        </Box>
      </CardActions>
    </Card>
  )
}
