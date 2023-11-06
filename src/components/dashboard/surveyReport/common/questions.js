import React, { useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  LinearProgress,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Stack,
  Typography
} from '@mui/material'
import DataGrid from 'components/common/dataGrid'
import { GridToolbarContainer, GridToolbarExport, useGridApiRef } from '@mui/x-data-grid-pro'
import { toJpeg } from 'html-to-image'

import { Download, ExpandMore, MoreVert } from '@mui/icons-material'

const Questions = props => {
  const goal = props.goal
  const bottom = props.bottom

  const apiRef = useGridApiRef()
  const [showDetails, setShowDetails] = React.useState({ show: false, data: '' })
  const [rows, setRows] = useState([])

  const handleShowDetails = data => {
    setRows(data.evaluationPoints)
    setShowDetails({ show: true, data: data })
  }

  const handleCloseDetails = () => {
    setShowDetails({ show: false, data: '' })
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 190 },
    {
      field: 'name',
      headerName: 'Nombre',
      minWidth: 180,
      flex: 1,
      type: 'string'
    },
    {
      field: 'answerCount',
      headerName: 'Opiniones',
      type: 'number',
      width: 120
    },
    {
      field: 'csatScore',
      headerName: 'Puntaje CSAT',
      type: 'number',
      width: 120,
      renderCell: params => (
        <Typography
          sx={{
            fontWeight: '500',
            color:
              params.row.csatScore > goal
                ? 'secondary.main'
                : params.row.csatScore < bottom
                ? 'red.main'
                : 'common.black'
          }}
        >
          {params.row.csatScore}
        </Typography>
      )
    }
  ]

  const createImg = () => {
    const node = document.getElementById('questions-card')

    const filter = node => {
      if (node.classList === undefined) {
        return true
      } else {
        if (node.classList.contains('no-img-export') === true) {
          return false
        } else {
          return true
        }
      }
    }

    toJpeg(node, {
      filter: filter
    }).then(dataUrl => {
      const link = document.createElement('a')
      link.download = `NPS Trend - ${Date.now()}`
      link.href = dataUrl
      link.click()
      link.remove()
    })
  }

  const [anchor, setAnchor] = useState(null)
  const openMenu = event => {
    setAnchor(event.currentTarget)
  }

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport
          csvOptions={{
            fileName: showDetails.data.question + ' - ' + Date.now(),
            delimiter: ';',
            utf8WithBom: true
          }}
        />
      </GridToolbarContainer>
    )
  }

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        scroll="body"
        open={showDetails.show}
        onClose={() => setShowDetails({ show: false, data: '' })}
      >
        <DialogTitle>{showDetails ? showDetails.data.question : ''}</DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle1" color="text.secondary">
            Opiniones capturadas de {showDetails.data.surveyAnswersCount} participantes.
          </Typography>
          {showDetails?.data ? (
            <>
              <DataGrid
                apiRef={apiRef}
                autoHeight
                disableSelectionOnClick
                disableColumnResize
                disableColumnReorder
                hideFooter
                rows={rows}
                columns={columns}
                // rowCount={rows.length}
                // loading={GridLoading}
                slots={{
                  toolbar: CustomToolbar
                }}
                initialState={{
                  sorting: {
                    sortModel: [{ field: 'csatScore', sort: 'desc' }]
                  },
                  pinnedColumns: { left: ['name'] },
                  columns: {
                    columnVisibilityModel: {
                      id: false
                    }
                  }
                }}
              />
            </>
          ) : (
            ''
          )}

          <Typography align="right" variant="subtitle1" color="text.secondary">
            Mostrando todos los puntos de evaluación
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDetails({ show: false, data: '' })}>Cerrar</Button>
        </DialogActions>
      </Dialog>

      <Card variant="outlined" id="questions-card">
        <CardContent>
          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography
                sx={{ fontSize: 16, fontWeight: '500' }}
                color="text.secondary"
                gutterBottom
              >
                Oportunidades / Victorias
              </Typography>
              <Box>
                <IconButton onClick={openMenu}>
                  <MoreVert />
                </IconButton>
                <Menu
                  anchorEl={anchor}
                  open={Boolean(anchor)}
                  onClose={() => setAnchor(null)}
                  keepMounted
                  elevation={0}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  PaperProps={{ sx: { minWidth: 150 }, variant: 'outlined' }}
                  MenuListProps={{ style: { padding: 0 } }}
                >
                  <MenuList disablePadding>
                    <MenuItem onClick={createImg}>
                      <ListItemIcon>
                        <Download />
                      </ListItemIcon>
                      <ListItemText>Exportar JPEG</ListItemText>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </Stack>
            <Box>
              {props.res.DPQLoading === true ? (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '150px',
                    position: 'relative'
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: '0',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#ffffff',
                      width: '100%',
                      zIndex: '50',
                      opacity: '0.8'
                    }}
                  >
                    <CircularProgress size={30} />
                    <Typography
                      variant="caption"
                      sx={{ fontSize: '0.875rem', zIndex: '55', marginTop: '0.2rem' }}
                    >
                      Cargando...
                    </Typography>
                  </Box>
                </Box>
              ) : (props.res.data.length === undefined) | (props.res.data.length == []) ? (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '150px',
                    position: 'relative'
                  }}
                >
                  <Typography variant="caption" sx={{ fontSize: '0.875rem', zIndex: '55' }}>
                    No hay datos.
                  </Typography>
                </Box>
              ) : (
                <Box>
                  {props.res.data.map(itemQuestion => {
                    let enoughEvaluationPoints = itemQuestion.evaluationPoints.length >= 4
                    let opportunities = itemQuestion.evaluationPoints.filter(
                      evaluationPoint => evaluationPoint.csatScore < bottom
                    )

                    return (
                      <Accordion
                        key={itemQuestion.id}
                        variant="outlined"
                        sx={{
                          borderTopColor: 'transparent',
                          '&:first-of-type': {
                            borderTopColor: 'rgba(0, 0, 0, 0.12)!important'
                          },
                          '&.Mui-expanded': {
                            borderTopColor: 'rgba(0, 0, 0, 0.12)!important',
                            borderBottomColor: 'rgba(0, 0, 0, 0.12)!important'
                          }
                        }}
                        square
                      >
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ width: '100%' }}
                          >
                            <Stack spacing={0.5} sx={{ width: '100%' }}>
                              <Typography>{itemQuestion.question}</Typography>
                              <Typography
                                variant="body1"
                                sx={{ fontWeight: '300', fontSize: '0.95rem' }}
                              >
                                {itemQuestion.surveyAnswersCount} participantes
                              </Typography>
                            </Stack>

                            <Stack
                              direction="column"
                              spacing={0.5}
                              alignItems="flex-end"
                              justifyContent="flex-end"
                              sx={{ flexShrink: '0', width: { xs: '100%', sm: 'auto' } }}
                            >
                              <Stack
                                direction="row"
                                spacing={0.5}
                                sx={{
                                  minWidth: '50px',
                                  color:
                                    itemQuestion.csatScore > goal
                                      ? 'secondary.main'
                                      : itemQuestion.csatScore < bottom
                                      ? 'red.main'
                                      : 'common.black'
                                }}
                              >
                                <Typography
                                  color="inherit"
                                  sx={{
                                    marginLeft: '10px',
                                    fontWeight: '500',
                                    display: 'inline'
                                  }}
                                >
                                  {itemQuestion.csatScore > goal
                                    ? 'Victoria '
                                    : itemQuestion.csatScore < bottom
                                    ? 'Oportunidad '
                                    : ''}
                                </Typography>
                                <Typography
                                  align="right"
                                  sx={{
                                    fontWeight: '500',
                                    paddingRight: '20px'
                                  }}
                                >
                                  {itemQuestion.csatScore}
                                </Typography>
                              </Stack>
                              <Typography
                                align="right"
                                variant="body1"
                                sx={{
                                  fontWeight: '300',
                                  fontSize: '0.95rem',
                                  paddingRight: '20px',
                                  color: 'red.main'
                                }}
                              >
                                {opportunities.length == 0
                                  ? ''
                                  : opportunities.length > 1
                                  ? `${opportunities.length} oportunidades`
                                  : '1 oportunidad'}
                              </Typography>
                            </Stack>
                          </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                          <List sx={{ minWidth: { xs: '100%' } }}>
                            {enoughEvaluationPoints
                              ? opportunities.map(evaluationPoint => {
                                  return (
                                    <ListItem divider key={evaluationPoint.id}>
                                      <ListItemText disableTypography>
                                        <Typography variant="body1" sx={{ fontSize: '0.9rem' }}>
                                          {evaluationPoint.name}
                                        </Typography>
                                        <Typography
                                          variant="body1"
                                          sx={{ fontWeight: '300', fontSize: '0.85rem' }}
                                        >
                                          {evaluationPoint.surveyAnswersCount} opiniones
                                        </Typography>
                                      </ListItemText>
                                      <ListItemSecondaryAction
                                        sx={{
                                          fontWeight: '500',
                                          color:
                                            +evaluationPoint.csatScore < bottom
                                              ? 'red.main'
                                              : 'common.black'
                                        }}
                                      >
                                        {evaluationPoint.csatScore}
                                      </ListItemSecondaryAction>
                                    </ListItem>
                                  )
                                })
                              : itemQuestion.evaluationPoints.map(evaluationPoint => {
                                  return (
                                    <ListItem divider>
                                      <ListItemText>{evaluationPoint.name}</ListItemText>
                                      <ListItemSecondaryAction
                                        sx={{
                                          fontWeight: '500'
                                        }}
                                      >
                                        {evaluationPoint.csatScore}
                                      </ListItemSecondaryAction>
                                    </ListItem>
                                  )
                                })}
                          </List>
                          <Typography align="right" variant="subtitle1" color="text.secondary">
                            {enoughEvaluationPoints
                              ? `Mostrando todos los puntos que requieren atención ( CSAT < ${bottom} )`
                              : `Mostrando todos los puntos de evaluación (${itemQuestion.evaluationPoints.length})`}
                          </Typography>
                          {enoughEvaluationPoints ? (
                            <Box
                              sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginTop: '1rem',
                                userSelect: 'none'
                              }}
                            >
                              <Link
                                underline="hover"
                                onClick={() => handleShowDetails(itemQuestion)}
                              >
                                Ver todos
                              </Link>
                            </Box>
                          ) : (
                            ''
                          )}
                        </AccordionDetails>
                      </Accordion>
                    )
                  })}
                </Box>
              )}
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </>
  )
}

export default Questions
