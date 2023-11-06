import React from 'react'
import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material'

const headCells = [
  { id: 'actions', align: 'left', label: '' },
  { id: 'name', align: 'left', label: 'Nombre' },
  { id: 'email', align: 'left', label: 'Usuario' },
  { id: 'roles', align: 'left', label: 'Roles' },
  { id: 'evaluationGroups', align: 'left', label: 'Puntos asignados' },
  { id: 'updatedAt', align: 'right', label: 'Última act.' }
]

export default function ClientSettings(props) {
  const { order, orderBy, onRequestSort } = props

  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            size="small"
            key={headCell.id}
            align={headCell.align}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id !== 'actions' && (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                className="text-center"
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
