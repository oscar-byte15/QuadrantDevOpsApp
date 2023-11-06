import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Grid,
  Fab,
  Card,
  CardHeader,
  CardContent,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Box,
  LinearProgress
} from '@mui/material'
import DataGrid from 'components/common/dataGrid'
import TextFilter from 'components/filter/stringFilter'
import { Add, Edit, MoreVert } from '@mui/icons-material'

import { cleanFilterVisibility, filterInGroupsList } from 'redux/actions/filter/actionDispatcher'
import useEffectAfterMount from 'hooks/useEffectAfterMount'
import { useHistory } from 'react-router-dom'
import TagsContainer from '../tagsContainer'
import httpModule from 'services/httpModule'
import BodyCard from 'components/common/bodyCard'

const countryRegionformatter = params => (params.value && (params.value.name || params.value)) || ''

const dateOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
}

const dateFormatter = params => {
  const date = new Date(params.value)
  return date.toLocaleString(undefined, dateOptions).replace(',', '')
}

const tagsRender = params => <TagsContainer tags={params.value ?? []} />

const columns = [
  {
    field: 'actions',
    type: 'actions',
    sortable: false,
    width: 50,
    renderCell: params => <Actions groupId={params.row.id} />
  },
  { field: 'id', width: 190 },
  { field: 'name', type: 'string', flex: 1, minWidth: 250, headerName: 'Punto de evaluación' },
  { field: 'tags', type: 'string', width: 300, headerName: 'Etiquetas', renderCell: tagsRender },
  {
    field: 'country',
    type: 'string',
    width: 150,
    headerName: 'País',
    valueFormatter: countryRegionformatter
  },
  {
    field: 'region',
    type: 'string',
    width: 150,
    headerName: 'Región',
    valueFormatter: countryRegionformatter
  },
  {
    field: 'timezone',
    type: 'string',
    hide: true,
    width: 150,
    headerName: 'Huso Horario',
    valueFormatter: countryRegionformatter
  },
  {
    field: 'updatedAt',
    type: 'date',
    width: 180,
    headerName: 'Última edición',
    valueFormatter: dateFormatter
  }
]

const GroupsList = props => {
  const dispatch = useDispatch()
  const [page, setPage] = React.useState(0)
  const handleChange = value => {
    setPage(value)
  }
  const isAdmin = useSelector(state => state.auth.roles.includes('ADMIN'))
  const search = useSelector(state => state.filter.searchString)
  const [groups, setGroups] = React.useState({ loading: true, data: undefined })
  const { loading, data } = groups

  const [searchString, setSearchString] = useState('')

  useEffect(() => {
    setGroups({ ...groups, loading: true })
    httpModule
      .get(`/v1/evaluationGroups/listEvaluationGroups?${search ? `search=${search}` : ''}`)
      .then(res => {
        setGroups({ data: res.data, loading: false })
        setPage(0)
      })
  }, [search])

  useEffectAfterMount(() => {
    dispatch(filterInGroupsList())
    return () => dispatch(cleanFilterVisibility())
    //eslint-disable-next-line
  }, [])

  return (
    <>
      <BodyCard>
        <CardHeader
          title="Puntos de evaluación diferenciados"
          subheader="Administra todos tus puntos de evaluación"
        />
        <CardContent sx={{ pb: 0 }}>
          <Stack spacing={2}>
            <TextFilter searchString={searchString} setSearchString={setSearchString} />
            <Box sx={{ height: '500px' }}>
              <DataGrid
                columns={columns}
                rows={data?.docs ?? []}
                rowCount={data?.totalDocs ?? 0}
                disableSelectionOnClick
                disableColumnResize
                disableColumnReorder
                pagination
                autoPageSize
                paginationMode="client"
                page={page}
                onPageChange={handleChange}
                loading={loading}
                components={{
                  LoadingOverlay: LinearProgress
                  // Toolbar: CustomToolbar
                }}
                initialState={{
                  sorting: {
                    sortModel: [{ field: 'updatedAt', sort: 'desc' }]
                  },
                  columns: {
                    columnVisibilityModel: {
                      id: false
                    }
                  },
                  pinnedColumns: { left: ['actions', 'name'] }
                }}
              />
            </Box>
          </Stack>
        </CardContent>
      </BodyCard>
      {isAdmin && (
        <Fab
          color="primary"
          aria-label="add"
          className="fab"
          onClick={() => props.history.push('/quadrant/groups/add')}
        >
          <Add />
        </Fab>
      )}
    </>
  )
}

const Actions = ({ groupId }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const openMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const history = useHistory()
  const handleEdit = () => {
    history.push(`/quadrant/groups/edit/${groupId}`)
  }
  return (
    <>
      <IconButton color={'primary'} size="small" onClick={handleEdit}>
        <Edit fontSize="small" />
      </IconButton>
    </>
  )
}

export default GroupsList
