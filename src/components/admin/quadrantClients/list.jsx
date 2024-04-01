import React from 'react'
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
  Paper,
  Chip
} from '@mui/material'
import adminServices from '../../../services/web_services/admin'
import { Plus as PlusIcon, Edit2 as EditIcon } from 'react-feather'
import AddForm from './addForm'

export default function QuadrantClientsList() {
  const dispatch = useDispatch()
  dispatch(selectOption(ADMIN_MENU_OPTIONS.CLIENTS.id))
  const [quadrantClients, setQuadrantClients] = useState(new Map())
  const [addFormOpen, setAddFormOpen] = useState(false)
  const [clientToEdit, setClientToEdit] = useState(null)

  // useEffect(() => {
  //   adminServices.getQuadrantClients().then(res => {
  //     let newMap = new Map()
  //     for (let client of res.data)
  //       newMap.set(client.id, { ...client, active: client.active !== false })
  //     setQuadrantClients(newMap)
  //   })
  // }, [])

  const handleClickOpenAddform = () => {
    setAddFormOpen(true)
  }

  const handleClose = () => {
    setClientToEdit(null)
    setAddFormOpen(false)
  }

  const onNewClientAdded = newClient => {
    newClient.users = newClient.users ?? 0
    let map = quadrantClients
    map.set(newClient.id, newClient)
    setQuadrantClients(map)
    handleClose()
  }

  const handleEdit = client => {
    setClientToEdit(client)
    handleClickOpenAddform()
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Cant. Usuarios</TableCell>
              <TableCell>Suscripción</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from(quadrantClients).map(client => {
              client = client[1]
              let active = client.active
              return (
                <TableRow key={client.id}>
                  <TableCell>{client.id}</TableCell>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>{client.users}</TableCell>
                  <TableCell>
                    <Chip
                      label={active ? 'Activo' : 'Desactivado'}
                      color={active ? 'success' : 'error'}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(client)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Fab color="primary" aria-label="add" className="fab" onClick={handleClickOpenAddform}>
        <PlusIcon />
      </Fab>

      {addFormOpen && (
        <Dialog open={addFormOpen} onClose={handleClose} fullWidth={true}>
          <DialogTitle>Cliente Nuevo</DialogTitle>
          <DialogContent>
            <AddForm
              quadrantClient={clientToEdit}
              onCancelClicked={handleClose}
              onSubmitSuccess={onNewClientAdded}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
