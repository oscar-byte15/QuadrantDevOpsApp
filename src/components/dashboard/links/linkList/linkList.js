import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import TextFilter from 'components/filter/stringFilter'
import {
  Grid,
  CardHeader,
  CardContent,
  Button,
  CardActions,
  Stack,
  Typography,
  Box,
  LinearProgress
} from '@mui/material'
import { Link } from '@mui/icons-material'
import { cleanFilterVisibility, filterInLinksList } from 'redux/actions/filter/actionDispatcher'
import { listLinks } from 'services/web_services/links'
import httpModule from 'services/httpModule'
import DataGrid from 'components/common/dataGrid'
import Actions from './common/actionMenu'
import QRCodeDialogbutton from './common/qrCodeDialogButton'
import CopyUrlButton from './common/copyUrlButton'

const dateFormatter = params => {
  const date = new Date(params.value).toLocaleString('es', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'America/Lima'
  })

  const time = new Date(params.value).toLocaleString('es', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/Lima'
  })

  return `${date} ${time}`
}

const columns = [
  {
    field: 'actions',
    type: 'actions',
    sortable: false,
    width: 30,
    renderCell: params => {
      return (
        <Actions
          link={params.row}
          mailing={params.row.canUseMailing}
          uniqueLinks={params.row.canUseUniqueLink}
        />
      )
    },
    resizable: false
  },
  { field: 'id', width: 190, headerName: 'ID' },
  { field: 'surveyName', type: 'string', minWidth: 200, headerName: 'Encuesta' },
  { field: 'evaluationPointName', type: 'string', minWidth: 200, headerName: 'Punto' },
  //  NECESITAMOS QUE EL SERVICIO TRAIGA TODOS LOS MÓDULOS ACTIVOS EN LA SURVEY
  //  PARA PODER MOSTRAR ESTA COLUMNA
  // {
  //   field: 'modules',
  //   type: 'string',
  //   minWidth: 200,
  //   headerName: 'Módulos',
  //   renderCell: params => {
  //     console.log(params)
  //     return (
  //       <Stack direction="row" spacing={0.2}>
  //         {params.row.survey.welcome ? <Handshake /> : ''}
  //         {params.row.survey.traceability ? <TrackChanges /> : ''}
  //         {params.row.survey.csat ? <TrackChanges /> : ''}

  //         <Mood />
  //         <Filter9Plus />
  //         <Star />
  //         <Comment />
  //         <Person />
  //       </Stack>
  //     )
  //   }
  // },
  {
    field: 'updatedAt',
    type: 'date',
    minWidth: 145,
    width: 145,
    headerName: 'Última edición',
    valueFormatter: dateFormatter
  },
  {
    field: 'shortUrl',
    type: 'string',
    flex: 1,
    minWidth: 320,
    headerAlign: 'right',
    align: 'right',
    headerName: 'Link',
    renderCell: params => {
      return (
        <Stack
          direction="row"
          spacing={0.5}
          justifyContent="space-between"
          alignItems="center"
          sx={{
            backgroundColor: 'secondary.main',
            padding: '2px 1rem',
            borderRadius: '24px',
            minWidth: '300px'
          }}
        >
          <Typography
            variant="body2"
            component="span"
            sx={{
              display: 'inline-block',
              userSelect: 'all'
            }}
          >
            {params.row.linkUrl}
          </Typography>
          <Stack direction="row" spacing={0.1} justifyContent="flex-end" alignItems="center">
            <CopyUrlButton link={params.row.linkUrl} />
            <QRCodeDialogbutton link={params} />
          </Stack>
        </Stack>
      )
    }
  }
]

const LinkList = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [availableServices, setAvailableServices] = useState({
    mailing: false,
    uniqueLinks: false
  })
  useEffect(() => {
    httpModule.get('/v1/quadrantClient/servicesStatus').then(({ data }) => {
      setAvailableServices({
        mailing: data.mailing?.enabled,
        uniqueLinks: data.uniqueLinks?.enabled
      })
    })
  }, [])

  const [page, setPage] = useState(1)
  const handleChange = (_, value) => setPage(value)
  const handlePageChange = value => setPage(value)

  const search_query = useSelector(state => state.filter.searchString)
  useEffect(() => setPage(1), [search_query])

  useEffect(() => {
    dispatch(filterInLinksList())
    return () => dispatch(cleanFilterVisibility())
    //eslint-disable-next-line
  }, [])

  const [state, setState] = useState({ data: { docs: [] }, loading: true, error: false })
  useEffect(() => {
    setState({ ...state, loading: true, data: { docs: [] } })
    listLinks(page, search_query)
      .then(res => {
        return res
      })
      .then(res => {
        res.data.docs.map(doc => {
          doc.canUseMailing = availableServices.mailing
          doc.canUseUniqueLink = availableServices.uniqueLinks
          doc.evaluationPointName = doc.evaluationGroup.name
          doc.surveyName = doc.survey.name
          doc.linkUrl = process.env.REACT_APP_SURVEYS_URL
            ? process.env.REACT_APP_SURVEYS_URL + doc.shortUrl
            : '/' + doc.shortUrl
        })
        return res
      })
      .then(res => setState({ data: res.data, loading: false }))

    //eslint-disable-next-line
  }, [search_query, page, availableServices])

  const { data, loading } = state
  const [searchString, setSearchString] = useState('')

  return (
    <>
      <CardHeader
        title="Links"
        subheader="Todos los links de las encuestas creadas las encuentras aquí"
      />

      <CardContent sx={{ pt: 1 }}>
        <Stack spacing={2}>
          {availableServices.uniqueLinks && (
            <Grid item xs={12}>
              <Button
                size="small"
                variant="outlined"
                color="primary"
                onClick={() => history.push('/quadrant/uniqueLinks')}
                startIcon={<Link />}
              >
                Links únicos generados
              </Button>
            </Grid>
          )}

          {/* NECESITAMOS REFACTORIZAR ESTE SERVICIO PARA PODER MANEJAR EL SEARCHSTRING  */}
          {/* <TextFilter searchString={searchString} setSearchString={setSearchString} /> */}
          <Box sx={{ height: '500px' }}>
            <DataGrid
              columns={columns}
              rows={data?.docs ?? []}
              rowCount={data?.totalDocs ?? 0}
              disableSelectionOnClick
              disableColumnReorder
              // pagination
              autoPageSize
              paginationMode="client"
              page={page}
              onPageChange={handlePageChange}
              loading={loading}
              components={{
                LoadingOverlay: LinearProgress
                // Toolbar: CustomToolbar
              }}
              initialState={{
                sorting: {
                  sortModel: [{ field: 'updatedAt', sort: 'desc' }]
                },
                pinnedColumns: { left: ['actions', 'surveyName', 'evaluationPointName'] },
                columns: {
                  columnVisibilityModel: {
                    id: false
                  }
                }
              }}
            />
          </Box>
        </Stack>
      </CardContent>

      <CardActions></CardActions>
    </>
  )
}
export default LinkList
