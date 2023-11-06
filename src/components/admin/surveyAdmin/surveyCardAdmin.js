import React, { useEffect, useState } from 'react'
import {
  Fab,
  CardHeader,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Box,
  LinearProgress
} from '@mui/material'
import TextFilter from 'components/filter/stringFilter'
import { useDispatch, useSelector } from 'react-redux'
import { Add, Edit, Refresh } from '@mui/icons-material'
import { getSurveyRegenerated, getAllSurveys } from 'services/web_services/surveys'
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
    width: 100,
    type: 'actions',
    renderCell: params => {
      const history = useHistory()
      const handleEdit = () => history.push(`/quadrant/surveys/edit/${params.row.id}`)
      const handleRegenerate = () => Regenerate(params.row.id)
      return (
        <Stack direction="row" spacing={1}>
          <IconButton color="primary" size="small" onClick={handleRegenerate}>
            <Refresh fontSize="small" />
          </IconButton>
          <IconButton color="primary" size="small" onClick={handleEdit}>
            <Edit fontSize="small" />
          </IconButton>
        </Stack>
      )
    }
  },
  { field: 'id', width: 190, hide: true },
  { field: 'name', type: 'string', flex: 1, minWidth: 300, headerName: 'Encuesta' },
  {
    field: 'updatedAt',
    type: 'date',
    width: 150,
    headerName: 'Última edición',
    valueFormatter: dateFormatter
  }
]

export default function SurveyListAdmin(props) {
  const dispatch = useDispatch()
  const search = useSelector(state => state.filter.searchString)
  const [page, setPage] = useState(0)
  const handleChange = value => setPage(value)
  const [surveyData, setSurveyData] = useState([])
  const [searchString, setSearchString] = useState('')
  const [surveyFiltered, setSurveyFiltered] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getAllSurveys().then(res => {
      setSurveyData(res.data)
    })
    dispatch(filterInSurveysList())
    return () => dispatch(cleanFilterVisibility())
  }, [])

  useEffect(() => {
    setPage(0)
    if (searchString) {
      setLoading(true)
      const filteredSurveys = surveyData.filter(survey => survey.name === search)
      setSurveyFiltered(filteredSurveys)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    } else {
      setSurveyFiltered(surveyData)
      setLoading(false)
    }
  }, [search, surveyData])
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
                rows={surveyFiltered}
                rowCount={surveyFiltered.length}
                disableSelectionOnClick
                disableColumnResize
                disableColumnReorder
                pagination
                autoPageSize
                paginationMode="client"
                page={page}
                loading={loading}
                onPageChange={handleChange}
                components={{
                  LoadingOverlay: LinearProgress
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

const Regenerate = surveyId => {
  getSurveyRegenerated(surveyId)
    .then(res => {
      console.log('respuesta de regenerated succesful:', res.data)
    })
    .catch(err => {
      console.log('error de regenerated: ', err)
    })
}
