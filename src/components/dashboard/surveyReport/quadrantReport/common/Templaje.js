import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'

const template = props => {
  return (
    <>
      <Card
        variant="elevation"
        square
        elevation={0}
        sx={{
          backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='dimgray' stroke-width='3' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");`,
          borderRadius: '10px',
          backgroundColor: 'blue.light',
          marginBottom: '1.5em'
        }}
      >
        <CardContent sx={{ padding: '24px 32px!important' }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Box sx={{ width: { xs: '100%', sm: '285px' } }}>
              <Stack spacing={1}>
                <Typography sx={{ fontWeight: '500' }}>Detalles</Typography>
                <DetailCard
                  icon={<AccountCircle sx={{ color: '#616161' }} />}
                  content="234 opiniones"
                  alignContent="right"
                />
                <DetailCard
                  icon={<CalendarToday sx={{ color: '#616161' }} />}
                  content="dd/mm/YY - dd/mm/YY"
                />
              </Stack>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography sx={{ fontWeight: '500' }}>CSAT</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <ItemCard index="1" content="Pregunta 1" qty="56" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <ItemCard index="2" content="Pregunta 2" qty="60" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <ItemCard index="3" content="Pregunta 3" qty="55" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <ItemCard index="4" content="Pregunta 4" qty="59" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <ItemCard index="5" content="Pregunta 5" qty="60" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <ItemCard index="6" content="Pregunta 6" qty="62" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <ItemCard index="6" content="Pregunta 7" qty="68" />
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ fontWeight: '500' }}>NPS</Typography>
                </Grid>
                <Grid item xs={12}>
                  <ItemCard
                    content="En una escala del 0 al 10 ¿Que tan probable es que nos recomiende con un
                          amigo o familiar?"
                    qty="123"
                  />
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </>
  )
}

export default template
