import React from 'react'
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Button,
  Typography,
  Avatar,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Box,
  Divider
} from '@mui/material'
import { getEvaluationGroups, saveConfiguration } from 'services/web_services/notifications'
import { setSnackbar } from 'redux/actions/snackbar/actionDispatcher'
import { useDispatch } from 'react-redux'

const Notifications = () => {
  const dispatch = useDispatch()
  const [evaluationGroups, setEvaluationGroups] = React.useState(new Map())

  const updateGroup = (id, data) => {
    const groups = new Map(evaluationGroups)
    groups.set(id, data)
    setEvaluationGroups(groups)
  }

  const handleClick = () => {
    const config = [...evaluationGroups.values()].map(group => ({
      id: group._id,
      complaint: group.complaint,
      suggestion: group.suggestion,
      congratulation: group.congratulation,
      defaultBox: group.defaultBox,
      Promotor: group.Promotor,
      Neutro: group.Neutro,
      Detractor: group.Detractor
    }))
    saveConfiguration({ evaluationGroups: config }).then(() =>
      dispatch(setSnackbar(true, 'Configuración guardada correctamente'))
    )
  }

  React.useEffect(() => {
    getEvaluationGroups().then(res => {
      const groups = new Map()

      res.data.forEach(group =>
        groups.set(group._id, {
          _id: group._id,
          name: group.name,
          users: group.users,
          complaint: group.notificationsConfig?.complaint ?? [],
          suggestion: group.notificationsConfig?.suggestion ?? [],
          congratulation: group.notificationsConfig?.congratulation ?? [],
          defaultBox: group.notificationsConfig?.defaultBox ?? [],
          Promotor: group.notificationsConfig?.Promotor ?? [],
          Neutro: group.notificationsConfig?.Neutro ?? [],
          Detractor: group.notificationsConfig?.Detractor ?? [],
        })
      )
      setEvaluationGroups(groups)
    })
  }, [])

  return (
    <Card variant="outlined" square>
      <CardHeader
        title="Centro de notificaciones"
        subheader="Configura las notificaciones de tus grupos de evaluación para tus usuarios desde aquí"
      />
      <CardContent>
        <Stack
          spacing={1}
          divider={
            <Divider
              orientation="horizontal"
              sx={{ marginTop: '20px!important', marginBottom: '20px!important' }}
            />
          }
        >
          {[...evaluationGroups].map(group => (
            <GroupCard key={group[0]} group={group[1]} updateGroup={updateGroup} />
          ))}
        </Stack>
      </CardContent>
      <CardActions>
        <Button disableElevation variant="contained" color="primary" onClick={handleClick}>
          Guardar Configuración
        </Button>
      </CardActions>
    </Card>
  )
}
export default Notifications

const inboxTypes = [
  { key: 'congratulation', name: 'Felicitaciones'},
  { key: 'suggestion', name: 'Sugerencias' },
  { key: 'complaint', name: 'Reclamos'},
  { key: 'defaultBox', name: 'Buzón por defecto'}
]

const npsCategories = [
  { key: 'Promotor', name: 'Promotor'},
  { key: 'Neutro', name: 'Neutro'},
  { key: 'Detractor', name: 'Detractor'}
]

const boxColors = {
  congratulation: '#53dd6c',
  suggestion: '#eec643',
  complaint: '#e4572e',
  Promotor: '#53dd6c',
  Neutro: '#eec643',
  Detractor: '#e4572e'
}

const GroupCard = React.memo(({ group, updateGroup }) => {

  const { _id, users, name } = group
  const handleClick = (key, id) => {
    const inboxUsers = group[key]
    if (inboxUsers?.includes(id)) return
    if (!id || !inboxUsers) return null
    let newArr = [...inboxUsers, id]
    updateGroup(_id, { ...group, [key]: newArr })
  }

  const handleDelete = (key, id) => {
    const inboxUsers = group[key]
    if (!id || !inboxUsers) return null
    let newArr = inboxUsers.filter(user => user !== id)
    updateGroup(_id, { ...group, [key]: newArr })
  }


  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ opacity: '0.9' }}>
            {name}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card variant="outlined">
            <CardContent>
              <Stack spacing={1}>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: '1.22rem'
                  }}
                >
                  Por tipo de buzón
                </Typography>
                {inboxTypes.map(inbox => (
                  <React.Fragment key={inbox.key}>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <Box
                        sx={{
                          height: '6px',
                          width: '6px',
                          backgroundColor: boxColors[inbox.key]
                        }}
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          // fontSize: '1.15rem',
                          opacity: '0.9'
                        }}
                      >
                        {inbox.name}
                      </Typography>
                    </Stack>

                    <Stack
                      direction="row"
                      alignItems="flex-start"
                      spacing={1}
                      divider={<Divider orientation="vertical" flexItem />}
                    >
                      <Box>
                        <FormControl
                          variant="outlined"
                          size="small"
                          margin="none"
                          disabled={group[inbox.key]?.length == users.length}
                          sx={{ minWidth: '150px' }}
                        >
                          <InputLabel variant="outlined">Añadir</InputLabel>
                          <Select
                            variant="outlined"
                            size="small"
                            label="Añadir"
                            value=""
                            onChange={e => handleClick(inbox.key, e.target.value)}
                          >
                            {users
                              //.filter(user => !inbox.list.includes(user._id))
                              .map(user => (
                                <MenuItem key={user._id} value={user._id}>
                                  {user.name}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          listStyle: 'none',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          gap: '4px',
                          minHeight: '40px'
                        }}
                      >
                        {users
                          .filter(user => group[inbox.key]?.includes(user._id))
                          .map(user => (
                            <UserChip
                              key={user._id}
                              name={user.name}
                              handleDelete={() => handleDelete(inbox.key, user._id)}
                            />
                          ))}
                      </Box>
                    </Stack>
                  </React.Fragment>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card variant="outlined">
            <CardContent>
              <Stack spacing={1}>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: '1.22rem'
                  }}
                >
                  Por categoría NPS
                </Typography>
                {npsCategories.map(inbox => (
                  <React.Fragment key={inbox.key}>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <Box
                        sx={{
                          height: '6px',
                          width: '6px',
                          backgroundColor: boxColors[inbox.key]
                        }}
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          opacity: '0.9'
                        }}
                      >
                        {inbox.name}
                      </Typography>
                    </Stack>

                    <Stack
                      direction="row"
                      alignItems="flex-start"
                      spacing={1}
                      divider={<Divider orientation="vertical" flexItem />}
                    >
                      <Box>
                        <FormControl
                          variant="outlined"
                          size="small"
                          margin="none"
                          disabled={group[inbox.key]?.length == users.length}
                          sx={{ minWidth: '150px' }}
                        >
                          <InputLabel variant="outlined">Añadir</InputLabel>
                          <Select
                            variant="outlined"
                            size="small"
                            label="Añadir"
                            value=""
                            onChange={e => handleClick(inbox.key, e.target.value)}
                          >
                            {users
                              //.filter(user => !inbox.list.includes(user._id))
                              .map(user => (
                                <MenuItem key={user._id} value={user._id}>
                                  {user.name}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          listStyle: 'none',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          gap: '4px',
                          minHeight: '40px'
                        }}
                      >
                        {users
                          .filter(user => group[inbox.key]?.includes(user._id))
                          .map(user => (
                            <UserChip
                              key={user._id}
                              name={user.name}
                              handleDelete={() => handleDelete(inbox.key, user._id)}
                            />
                          ))}
                      </Box>
                    </Stack>
                  </React.Fragment>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
})

const UserChip = ({ name, handleDelete }) => (
  <Chip
    component="li"
    label={name}
    variant="default"
    onDelete={handleDelete}
    avatar={
      <Avatar>
        {name
          .split(' ')
          .map(n => n[0])
          .join('')
          .toUpperCase()}
      </Avatar>
    }
  />
)
