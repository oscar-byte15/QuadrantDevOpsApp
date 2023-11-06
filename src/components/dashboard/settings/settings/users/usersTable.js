import React, { useState, useEffect } from 'react'
import {
  TableContainer,
  TableBody,
  Table,
  TableRow,
  TableCell,
  Grid,
  Button,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  Dialog,
  DialogContent,
  DialogTitle,
  Card,
  CardHeader,
  CardContent,
  CardActions
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { selectOption } from 'redux/actions/menu/actionDispatcher'
import MENU_OPTIONS from 'components/menu/menuSections'
import TableHeader from 'components/tables/headers/defaultSorter'
import clientServices from 'services/web_services/clients'
import _ from 'lodash'
import { MoreVertical as MoreVerticalIcon } from 'react-feather'
import moment from 'moment'
import UserForm from './forms/userForm'

function UserRow(props) {
  const { user, editClicked } = props

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <TableRow>
      <TableCell className="table-actions">
        <IconButton onClick={handleClick}>
          <MoreVerticalIcon size={18} strokeWidth={1} />
        </IconButton>
        <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem
            onClick={() => {
              handleClose()
              editClicked(user)
            }}
          >
            Editar
          </MenuItem>
        </Menu>
      </TableCell>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.roles ? user.roles.join(' - ') : 'no roles'}</TableCell>
      <TableCell>
        <Grid container spacing={1}>
          {user.evaluationGroups?.map(eg => {
            return (
              <Grid item key={user.id + eg.id}>
                <Chip label={eg.name} />
              </Grid>
            )
          })}
        </Grid>
      </TableCell>
      <TableCell align="right">{moment(user.updatedAt).format('DD/MM/YY HH:mm:ss')}</TableCell>
    </TableRow>
  )
}

export default function UsersTable() {
  const dispatch = useDispatch()
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('name')
  const [users, setUsers] = useState([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const handleRequestSort = (_, catSelected) => {
    const isAsc = orderBy === catSelected && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(catSelected)
  }

  useEffect(() => {
    dispatch(selectOption(MENU_OPTIONS.SETTINGS.id))
    clientServices.getUsers().then(res => {
      setUsers(res.data)
    })
  }, [dispatch])

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setSelectedUser(null)
  }

  const addUserClicked = () => {
    setDialogOpen(true)
  }

  const editUser = user => {
    setSelectedUser(user)
    setDialogOpen(true)
  }

  const onUserEdited = newUser => {
    let usersAux = users
    let index = usersAux.findIndex(user => user.id === newUser.id)
    if (index >= 0) usersAux[index] = newUser
    else usersAux.push(newUser)
    setUsers(usersAux)
    handleCloseDialog()
  }

  return (
    <>
      <Card variant="outlined">
        <CardHeader
          title="Gestión de usuarios"
          subheader="Administra los usuarios de tu organización"
        />
        <CardContent>
          <TableContainer>
            <Table>
              <TableHeader order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
              <TableBody>
                {_.orderBy(users, [orderBy], [order]).map(user => {
                  return <UserRow key={user.id} user={user} editClicked={editUser} />
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            disableElevation
            color="primary"
            size="large"
            onClick={addUserClicked}
          >
            Añadir
          </Button>
        </CardActions>
      </Card>
      <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle>Editar Usuario</DialogTitle>
        <DialogContent>
          <UserForm
            user={selectedUser}
            onCancelClicked={handleCloseDialog}
            onSubmitSuccess={onUserEdited}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
