import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { selectOption } from '../../../redux/actions/menu/actionDispatcher'
import ADMIN_MENU_OPTIONS from '../../menu/menuAdminOptions'
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Paper
} from '@mui/material'
import adminServices from '../../../services/web_services/admin'
import { Plus as PlusIcon, Edit2 as EditIcon, Lock as LockIcon } from 'react-feather'
import AddForm from './addForm'
import PasswordForm from './passwordForm'

export default function UserList() {
  const dispatch = useDispatch()
  const [users, setUsers] = useState(new Map())
  const [addFormOpen, setAddFormOpen] = useState(false)
  const [passwordFormOpen, setPasswordFormOpen] = useState(false)
  const [userToEdit, setUserToEdit] = useState(null)

  useEffect(() => {
    dispatch(selectOption(ADMIN_MENU_OPTIONS.USERS.id))
    adminServices.getUsers().then(res => {
      let newMap = new Map()
      for (let user of res.data) newMap.set(user.id, user)
      setUsers(newMap)
    })
  }, [])

  const handleClickOpenAddForm = () => {
    setAddFormOpen(true)
  }

  const handleClickOpenPasswordForm = () => {
    setPasswordFormOpen(true)
  }

  const handleClose = () => {
    setPasswordFormOpen(false)
    setAddFormOpen(false)
    setUserToEdit(null)
  }

  const onNewUserAdded = newUser => {
    newUser.users = 0
    let map = users
    map.set(newUser.id, newUser)
    setUsers(map)
    handleClose()
  }

  const handleEdit = user => {
    setUserToEdit(user)
    handleClickOpenAddForm()
  }

  const handlePasswordClick = user => {
    setUserToEdit(user)
    handleClickOpenPasswordForm()
  }

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Roles</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from(users).map(([_, user]) => {
              return (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.roles?.join(' - ') ?? '-'}</TableCell>
                  <TableCell>{user.quadrantClient.name}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(user)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handlePasswordClick(user)}
                      title="Cambiar contraseña"
                    >
                      <LockIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Fab color="primary" aria-label="add" className="fab" onClick={handleClickOpenAddForm}>
        <PlusIcon />
      </Fab>
      <Dialog open={addFormOpen || passwordFormOpen} onClose={handleClose} fullWidth={true}>
        <DialogTitle>
          {passwordFormOpen ? 'Cambiar contraseña para ' + userToEdit.name : 'Usuario Nuevo'}
        </DialogTitle>
        <DialogContent>
          {addFormOpen && (
            <AddForm
              user={userToEdit}
              onCancelClicked={handleClose}
              onSubmitSuccess={onNewUserAdded}
            />
          )}
          {passwordFormOpen && <PasswordForm user={userToEdit} onCancelClicked={handleClose} />}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}
