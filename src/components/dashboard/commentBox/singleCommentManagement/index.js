import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Divider,
  FormHelperText,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  MenuList,
  OutlinedInput,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import {
  ArrowDropDown,
  Assignment,
  CheckCircle,
  Inbox,
  Pending,
  Place,
  WatchLater
} from '@mui/icons-material'
import { createRecord, getTicketLogs } from 'services/web_services/commentBox'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import LabelPill from 'components/common/quadrantComponents/LabelPill'
import ContextData from '../commentManagement/common/contextData'
import CommentCard from '../commentManagement/common/commentCard'
import CommentPageLoader from './loader'
import Record from '../commentManagement/common/record'

const SingleCommentMGMT = props => {
  const params = useParams()
  const id = params.id

  const [answer, setAnswer] = useState({ loading: false, data: {} })

  useEffect(() => {
    setAnswer({ loading: true, data: {} })
    const setTicketLog = async () => {
      await getTicketLogs(id)
        .then(res => {
          res.contextData = {}
          res.contextData.surveyName = res.data.survey.name
          res.contextData.pointName = res.data.evaluationGroup.name
          res.contextData.commentType = res.data.commentBoxAnswer.type
          res.contextData.csatScore = res.data.csatScore
          res.contextData.npsPromoterType = res.data.npsPromoterType
          return res
        })
        .then(res => setAnswer({ loading: false, data: res.data, contextData: res.contextData }))
    }

    setTicketLog()
  }, [])

  const [aux, setAux] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  useEffect(() => {
    // setAnswer({ loading: true, data: {} })
    // const setTicketLog = async () => {
    //   await getTicketLogs(id)
    //     .then(res => setAnswer({ loading: false, data: res.data, contextData: res.contextData }))
    // }
    const createLogRecord = async () => {
      setSubmitting(true)
      await createRecord(aux.surveyAnswerId, aux.ticketBody, aux.state, aux.recordType)
        .then(res => {
          setAux(null)
          answer.data.ticketLog.push(res.ticket_log_record)
          setTicketLabel(res.ticket_State.status) === 'inProgress' ? 'En Curso' : 'Resuelto'
          setRecordBody('')
        })
        .then(() => {
          setSubmitting(false)
          // ticketLabel = ticketStateLabel()
        })
    }

    if (aux != null) {
      createLogRecord()
    }
  }, [aux])

  const ticketStateLabel = () => {
    if (answer?.data?.ticketState) {
      switch (answer.data.ticketState.status) {
        case undefined:
          return 'Abierto'
        case null:
          return 'Abierto'
        case 'inProgress':
          return 'En Curso'
        case 'closed':
          return 'Resuelto'
      }
    } else {
      return 'Abierto'
    }
  }
  const [ticketLabel, setTicketLabel] = useState(ticketStateLabel())
  const ticketLabel1 = answer?.data?.ticketState?.status

  const getInitials = person => {
    let initials = person
      .split(' ')
      .map(n => n[0])
      .join('')
    return initials
  }
  // SUBMITTING RECORD
  const [anchor, setAnchor] = useState(null)
  const toggleContextMenu = event => {
    setAnchor(event.target)
  }

  const [recordBody, setRecordBody] = useState('')
  const handleSubmit = type => {
    if (type === 'closing') {
      if (recordBody != '') {
        setAux({
          surveyAnswerId: answer.data.id,
          ticketBody: recordBody,
          state: 'closed',
          recordType: 'closing'
        })
      }
    } else {
      if (recordBody != '') {
        setAux({
          surveyAnswerId: answer.data.id,
          ticketBody: recordBody,
          state: 'inProgress',
          recordType: 'followUp'
        })
      }
    }
  }

  const handleChange = event => {
    setRecordBody(event.target.value)
  }

  return (
    <Container maxWidth={'md'}>
      <Card>
        {answer.data.answerId ? (
          <>
            <CardHeader
              disableTypography
              title={
                <Stack spacing={1} direction="row" justifyContent="flex-start" alignItems="center">
                  <Typography
                    sx={{
                      fontFamily: '"Archivo Variable", sans-serif;',
                      fontWeight: '400',
                      fontSize: '1.5rem',
                      margin: '0',
                      lineHeight: '1.334',
                      letterSpacing: '0em'
                    }}
                  >
                    Ticket {answer.data.answerId.toString().padStart(7, '0')}
                  </Typography>
                  <Chip
                    size="small"
                    sx={{
                      border: '1px solid rgba(0, 0, 0, 0.08)'
                    }}
                    icon={
                      ticketLabel1 == null || ticketLabel1 == undefined ? (
                        <Pending fontSize="small" color="inherit" sx={{ color: '' }} />
                      ) : ticketLabel1 === 'inProgress' ? (
                        <WatchLater fontSize="small" color="inherit" sx={{ color: '#ffc814' }} />
                      ) : (
                        <CheckCircle
                          fontSize="small"
                          color="inherit"
                          sx={{ color: 'green.main' }}
                        />
                      )
                    }
                    label={
                      ticketLabel1 == null || ticketLabel1 == undefined
                        ? 'Abierto'
                        : ticketLabel1 === 'inProgress'
                        ? 'En curso'
                        : 'Resuelto'
                    }
                  />
                </Stack>
              }
            />
            <CardContent>
              <Stack spacing={1}>
                <Box sx={{ width: '100%' }}>
                  <ContextData context={answer.contextData} />
                </Box>
                <CommentCard
                  commentBoxAnswer={answer.data.commentBoxAnswer}
                  contactFields={answer.data.questionAnswerList}
                  createdAt={answer.data.createdAt}
                />
                <Card>
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ fontFamily: '"Archivo Variable", sans-serif;', fontWeight: '400' }}
                    >
                      Registro
                    </Typography>
                    <List
                      sx={{
                        width: { xs: '100%' }
                      }}
                    >
                      {answer.data.ticketLog.length === 0 ? (
                        <Box
                          sx={{
                            display: 'flex',
                            width: '100%',
                            height: '250px',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          Todavía no hay registros...
                        </Box>
                      ) : (
                        answer.data.ticketLog.map((record, index) => {
                          const recordType = record.recordType

                          const createdAt = new Date(record.createdAt)
                            .toLocaleDateString('es', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: false,
                              timeZone: 'America/Lima'
                            })
                            .replace(',', '')
                          return (
                            <Fragment key={record.id}>
                              <Record
                                index={index}
                                recordType={recordType}
                                body={record.body}
                                initials={getInitials(record.name)}
                                user={record.name}
                                createdAt={createdAt}
                              />

                              {Boolean(index == answer.data.ticketLog.length - 1) ? (
                                ''
                              ) : (
                                <Divider light />
                              )}
                            </Fragment>
                          )
                        })
                      )}
                    </List>
                  </CardContent>
                </Card>
              </Stack>
            </CardContent>
            <CardActions>
              <Stack sx={{ width: '100%' }}>
                <Stack
                  direction={{ xs: 'column', md: 'row' }}
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  spacing={0.5}
                  sx={{ width: '100%' }}
                >
                  <OutlinedInput
                    size="medium"
                    autoFocus
                    multiline
                    fullWidth
                    disabled={ticketLabel1 == 'closed' || submitting ? true : false}
                    placeholder="Cuerpo del registro"
                    value={recordBody}
                    onChange={handleChange}
                    onKeyDown={event => {
                      if (event.key === 'Enter' && event.shiftKey && event.ctrlKey) {
                        event.preventDefault()
                        handleSubmit('closing')
                      }
                      if (event.key === 'Enter' && event.shiftKey && !event.ctrlKey) {
                        event.preventDefault()
                        handleSubmit()
                      }
                    }}
                    sx={{ flexGrow: '0' }}
                  />
                  <Box sx={{ width: { xs: '100%', md: 'auto' }, height: '53px' }}>
                    <ButtonGroup
                      size="large"
                      disableElevation
                      fullWidth
                      variant="contained"
                      sx={{ height: '100%' }}
                      disabled={ticketLabel1 == 'closed' || submitting ? true : false}
                    >
                      <Button size="large" onClick={handleSubmit} fullWidth>
                        Enviar
                      </Button>
                      <Button size="small" onClick={toggleContextMenu} sx={{ flexShrink: '5' }}>
                        <ArrowDropDown />
                      </Button>
                      <Menu
                        anchorEl={anchor}
                        open={Boolean(anchor)}
                        onClose={() => setAnchor(null)}
                        keepMounted
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        PaperProps={{ sx: { minWidth: 0 }, variant: 'outlined', elevation: 0 }}
                        MenuListProps={{ style: { padding: 0 } }}
                      >
                        <MenuList>
                          <MenuItem onClick={() => handleSubmit('closing')}>
                            Registrar y Cerrar
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </ButtonGroup>
                  </Box>
                </Stack>
                <FormHelperText
                  margin="dense"
                  sx={{
                    textAlign: 'left',
                    padding: '0 6px',
                    display: { xs: 'none', md: 'block' }
                  }}
                  children="protip: ⇧ + ⏎ para registrar | ctrl + ⇧ + ⏎ para registrar y cerrar."
                />
              </Stack>
            </CardActions>
          </>
        ) : (
          <CardContent>
            <CommentPageLoader />
          </CardContent>
        )}
      </Card>
    </Container>
  )
}
export default SingleCommentMGMT
