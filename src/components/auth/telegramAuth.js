import React from 'react'
import {
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Container,
  CircularProgress,
  Grid,
  Typography
} from '@mui/material'
import { Telegram } from '@mui/icons-material'
import { telegramAuth } from 'services/web_services/users'
import { Redirect } from 'react-router-dom'

const TelegramAuth = props => {
  //const auth = useSelector(state => state.auth)
  const [message, setMessage] = React.useState(false)
  const [integrating, setIntegrating] = React.useState(false)

  if (!props.location.state) return <Redirect to="/" />

  const onAuth = () => {
    setIntegrating(true)
    telegramAuth(props.location.state * 1)
      .then(res => setMessage(res.message))
      .catch(err => setMessage(err.message))
  }
  return (
    <Container>
      <Grid container style={{ justifyContent: 'center' }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            variant="outlined"
            style={{ overflow: 'auto', marginTop: '10vh', marginBottom: '10vh' }}
          >
            <CardMedia
              children={<Telegram style={{ fontSize: '4.5rem' }} />}
              style={{
                backgroundColor: '#0088cc',
                height: '180px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}
            />
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Quadrant + Telegram
              </Typography>
              <Typography variant="body1" style={{ marginTop: '1.5rem' }}>
                Estás a punto de vincular tu cuenta de Quadrant con Telegram.
              </Typography>

              <Typography variant="body1" style={{ marginTop: '1rem', minHeight: '90px' }}>
                {!message ? (
                  <>
                    Esto permitirá que Quadrant pueda enviarte notificaciones en tiempo real a
                    través de Telegram para los grupos de evaluación que estén habilitadas por el
                    adminitrador de tu cuenta Quadrant.
                  </>
                ) : (
                  <>{message}</>
                )}
              </Typography>
            </CardContent>
            <CardActions>
              {!message ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onAuth}
                  disableElevation
                  size="medium"
                >
                  <Grid item style={{ width: '80px', height: '20px' }}>
                    {!integrating ? 'Autorizar' : <CircularProgress size="1.5rem" />}
                  </Grid>
                </Button>
              ) : (
                <>
                  <Button
                    variant="contained"
                    disableElevation
                    color="primary"
                    disabled
                    onClick={onAuth}
                    size="medium"
                  >
                    Realizado
                  </Button>
                </>
              )}
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}
export default TelegramAuth
