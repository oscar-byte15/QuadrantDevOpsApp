import React from 'react'
import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material'

const defaultColumns = [
  { id: 'actions', align: 'left', label: '' },
  { id: 'name', align: 'left', label: 'Nombre' },
  { id: 'evaluationGroup', align: 'left', label: 'Grupo de Evaluación' },
  { id: 'updatedAt', align: 'right', label: 'Últ. actualización' }
]

export default function SorterHeader(props) {
  const { columns, order, orderBy, onRequestSort } = props

  const getColumns = () => {
    return columns ? columns : defaultColumns
  }

  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {getColumns().map(col => (
          <TableCell
            key={col.id}
            align={col.align}
            className={col.class}
            sortDirection={orderBy === col.id ? order : false}
          >
            {col.id !== 'actions' && (
              <TableSortLabel
                active={orderBy === col.id}
                direction={orderBy === col.id ? order : 'asc'}
                className="text-center"
                onClick={createSortHandler(col.id)}
              >
                {col.label}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
