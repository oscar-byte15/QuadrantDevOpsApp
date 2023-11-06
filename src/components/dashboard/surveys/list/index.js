import React, { useState } from 'react'
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
import TextFilter from 'components/filter/stringFilter'
import { useDispatch, useSelector } from 'react-redux'
import { Add, Edit, MoreVert } from '@mui/icons-material'
import { getSurveyRegenerated } from 'services/web_services/surveys'
import { cleanFilterVisibility, filterInSurveysList } from 'redux/actions/filter/actionDispatcher'
import DataGrid from 'components/common/dataGrid'
import { useHistory } from 'react-router-dom'
import useFetch from 'hooks/useFetch'
import BodyCard from 'components/common/bodyCard'

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

const columns = [
  {
    field: 'actions',
    type: 'actions',
    sortable: false,
    width: 50,
    renderCell: params => <Actions surveyId={params.row.id} />
  },
  { field: 'id', width: 190, hide: true },
  { field: 'name', type: 'string', flex: 1, minWidth: 300, headerName: 'Encuesta' },
  {
    field: 'updatedAt',
    type: 'date',
    width: 200,
    headerName: 'Última edición',
    valueFormatter: dateFormatter
  }
]

export default function SurveyList(props) {
  const dispatch = useDispatch()
  const search = useSelector(state => state.filter.searchString)
  const [page, setPage] = React.useState(0)
  const handleChange = value => setPage(value)
  const { loading, data } = useFetch(`/v1/surveys?search=${search}`)
  const [searchString, setSearchString] = useState('')

  React.useEffect(() => {
    dispatch(filterInSurveysList())
    return () => dispatch(cleanFilterVisibility())
    //eslint-disable-next-line
  }, [])

  React.useEffect(() => setPage(0), [search])

  return (
    <>
      <BodyCard>
        <CardHeader title="Encuestas" subheader="Administra todas tus encuestas" />
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
                  pinnedColumns: { left: ['actions'] }
                }}
              />
            </Box>
          </Stack>
        </CardContent>
      </BodyCard>
      <Fab
        color="primary"
        aria-label="add"
        className="fab"
        onClick={() => props.history.push('/quadrant/surveys/addsurvey')}
      >
        <Add />
      </Fab>
    </>
  )
}

const Actions = ({ surveyId }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const openMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const history = useHistory()
  const handleEdit = () => history.push(`/quadrant/surveys/edit/${surveyId}`)
  return (
    <>
      <IconButton color={'primary'} size="small" onClick={handleEdit}>
        <Edit fontSize="small" />
      </IconButton>
    </>
  )
}
