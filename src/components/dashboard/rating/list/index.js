import React, { useState } from 'react'
import { saveAs } from 'file-saver'
import {
  Grid,
  Fab,
  Card,
  CardHeader,
  CardContent,
  Rating,
  Stack,
  Button,
  Typography,
  CardActions,
  Link
} from '@mui/material'
import { Add } from '@mui/icons-material'
import DataGrid from 'components/common/dataGrid'
import { getProductsReport } from 'services/web_services/rating'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FormDialog from '../form'
import DetailedReportDialog from '../detail'
import httpModule from 'services/httpModule'
import { changeBackdropOptions } from 'redux/actions/backdrop/actionDispatcher'
import { newSnackbarMessage } from 'redux/actions/snackbar/actionDispatcher'
import { useDispatch, useSelector } from 'react-redux'
import BodyCard from 'components/common/bodyCard'

const toRatingComponent = params => {
  return (
    <>
      <Stack direction="row" spacing={1} alignItems="flex-end">
        <Typography variant="body2">
          {Math.round((params.value + Number.EPSILON) * 100) / 100}
        </Typography>
        <Rating readOnly value={params.value} precision={0.25} />
      </Stack>
    </>
  )
}

export default function Products() {
  const filter = useSelector(state => state.filter)
  const [points, setPoints] = React.useState([])
  const [surveys, setSurveys] = React.useState([])
  const [products, setProducts] = React.useState({ data: [], page: 1, loading: true })
  const [formValues, setFormValues] = React.useState({ name: '', description: '' })
  const [formDialogOpen, setFormDialogOpen] = React.useState(false)
  const [detailDialog, setDetailDialog] = useState({ show: false, product: '' })
  const dispatch = useDispatch()
  //const startDate = useSelector(state => state.filter.startDate)
  //const endDate = useSelector(state => state.filter.endDate)
  const auth = useSelector(state => state.auth)

  function ItemName({ product }) {
    const onClick = () => setDetailDialog({ show: true, product: product })
    return (
      <Typography variiant="body1" display="inline">
        {product.name}{' '}
        <Typography variant="body2" display="inline">
          (
          <Link variant="body2" underline="always" onClick={onClick}>
            detalle
          </Link>
          )
        </Typography>
      </Typography>
    )
  }

  const productsColumns = [
    {
      field: 'menu',
      headerName: '',
      type: 'actions',
      width: 40,
      renderCell: params => {
        return <LongMenu row={params.row} />
      },
      hideable: false
    },
    { field: 'id', width: 200 },
    {
      field: 'name',
      flex: 1,
      minWidth: 250,
      align: 'left',
      headerName: 'Nombre',
      type: 'string',
      hideable: false,
      renderCell: params => <ItemName product={params.row} />
    },
    {
      headerName: 'Rating',
      field: 'rating',
      width: 160,
      type: 'number',
      renderCell: toRatingComponent,
      hideable: false
    },
    {
      headerName: 'Opiniones',
      field: 'qty',
      width: 140,
      type: 'number',
      hideable: false
    }
  ]

  React.useEffect(() => {
    const setData = async () => {
      const sv = filter.preSelectedSurveys
      const surveyData = []
      await sv.forEach(s => surveyData.push(s.id))

      const ep = filter.preSelectedGroups
      const evaluationData = []
      await ep.forEach(point => evaluationData.push(point.id))

      !formDialogOpen &&
        (await getProductsReport(
          filter.startDate.startOf('day').toISOString(),
          filter.endDate.endOf('day').toISOString(),
          surveyData,
          evaluationData
        ).then(res => {
          setProducts({ data: res.data, loading: false })
        }))
    }
    setData()
  }, [filter])

  React.useEffect(() => {
    const setData = async () => {
      const sv = filter.preSelectedSurveys
      const surveyData = []
      await sv.forEach(s => surveyData.push(s.id))

      const ep = filter.preSelectedGroups
      const evaluationData = []
      await ep.forEach(point => evaluationData.push(point.id))

      !formDialogOpen &&
        (await getProductsReport(
          filter.startDate.startOf('day').toISOString(),
          filter.endDate.endOf('day').toISOString(),
          surveyData,
          evaluationData
        ).then(res => {
          setProducts({ data: res.data, loading: false })
        }))
    }
    setData()
  }, [formDialogOpen])

  /*
  React.useEffect(() => {
    dispatch(filterInSurveysList())
    return () => dispatch(cleanFilterVisibility())
    //eslint-disable-next-line
  }, [])
  */

  function LongMenu({ row }) {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = event => {
      setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
      setAnchorEl(null)
    }

    const handleOnClick = () => {
      setFormValues({ name: row.name, description: row.description, id: row.id })
      setFormDialogOpen(true)
    }

    return (
      <div>
        <IconButton aria-haspopup="true" onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          MenuListProps={{ 'aria-labelledby': 'long-button' }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem key={'editar'} onClick={handleOnClick}>
            {'Editar'}
          </MenuItem>
        </Menu>
      </div>
    )
  }

  function newProduct() {
    setFormValues({ name: '', description: '' })
    setFormDialogOpen(true)
  }

  function handleDownload() {
    dispatch(changeBackdropOptions({ open: true, showLoader: true }))
    httpModule
      .get(
        'v1/summary/getRatingSummary',
        {
          responseType: 'blob',
          params: {
            //startDate: startDate,
            //endDate: endDate
          }
        },
        { timeout: 10000 }
      )
      .then(res => {
        dispatch(changeBackdropOptions({ open: false, showLoader: false }))

        if (res.size) {
          let filename = auth.quadrantClient.name
            .replace(' ', '')
            .replace('á', 'a')
            .replace('é', 'e')
            .replace('í', 'i')
            .replace('ó', 'o')
            .replace('ú', 'u')
          filename = 'QUDRNT_' + filename.replace(/[^a-zA-Z0-9]/g, '') + '_' + Date.now()
          dispatch(newSnackbarMessage('Descargado con éxito', 'success'))
          saveAs(res, filename + '.xlsx')
        } else {
          dispatch(newSnackbarMessage('No tienes respuestas'))
        }
      })
      .catch(() => {
        dispatch(changeBackdropOptions({ open: false, showLoader: false }))
        dispatch(newSnackbarMessage('Ha ocurrido un error', 'error'))
      })
  }

  return (
    <>
      <BodyCard>
        <CardHeader
          title="Valoraciones"
          subheader="Administra tus items y consulta sus valoraciones"
        />
        <CardContent>
          <DataGrid
            initialState={{
              sorting: {
                sortModel: [{ field: 'qty', sort: 'desc' }]
              },
              columns: {
                columnVisibilityModel: {
                  id: false
                }
              }
            }}
            loading={products.loading}
            disableSelectionOnClick
            disableColumnResize
            disableColumnReorder
            autoHeight
            columns={productsColumns}
            rows={products.data}
          />
        </CardContent>
        <CardActions sx={{ padding: '8px 16px 16px 16px' }}>
          <Button size="small" variant="contained" disableElevation onClick={handleDownload}>
            Exportar detalle
          </Button>
        </CardActions>
      </BodyCard>

      <Fab
        color="primary"
        aria-label="add"
        className="fab"
        title="Crear producto"
        onClick={newProduct}
      >
        <Add />
      </Fab>
      {formDialogOpen && (
        <FormDialog open={formDialogOpen} setOpen={setFormDialogOpen} initialValues={formValues} />
      )}
      {detailDialog.show && (
        <DetailedReportDialog
          {...detailDialog}
          close={() => setDetailDialog({ show: false, product: {} })}
        />
      )}
    </>
  )
}
