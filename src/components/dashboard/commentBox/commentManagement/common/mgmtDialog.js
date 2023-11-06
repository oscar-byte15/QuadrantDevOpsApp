import React, { Fragment, useEffect, useRef, useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormHelperText,
  List,
  ListItem,
  ListItemIcon,
  ListSubheader,
  Menu,
  MenuItem,
  MenuList,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
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

import { createRecord } from 'services/web_services/commentBox'
import LabelPill from 'components/common/quadrantComponents/LabelPill'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import Record from './record'

const MGMTDialog = props => {
  const theme = useTheme()

  const [aux, setAux] = useState(null)
  const [loading, setLoading] = useState(false)

  const {
    surveyAnswerId,
    answerId,
    commentBoxAnswer,
    ticketLog,
    contactFields,
    ticketLabel,
    setTicketLabel,
    survey,
    evaluationGroup,
    updateLog
  } = props

  const setNewLog = newLog => {
    updateLog(newLog)
  }

  useEffect(() => {
    const createLogRecord = async () => {
      setLoading(true)

      await createRecord(aux.surveyAnswerId, aux.ticketBody, aux.state, aux.recordType).then(
        res => {
          const label = res.ticket_State.status === 'inProgress' ? 'En Curso' : 'Cerrado'
          setAux(null)
          setTicketLabel(label)
          setRecordBody('')
          setLoading(false)
          let newTicketLog = [...ticketLog, res.ticket_log_record]

          setNewLog(newTicketLog)
        }
      )
    }

    if (aux != null) {
      createLogRecord()
    }
  }, [aux])
  // DIALOG

  const [dialog, setDialog] = useState(false)

  const handleCloseMgmtDialog = () => {
    setDialog(false)
  }

  const getInitials = person => {
    let initials = person
      .split(' ')
      .map(n => n[0])
      .join('')
    return initials
  }

  // DIALOG ACTIONS

  const [anchor, setAnchor] = useState(null)

  const toggleContextMenu = event => {
    setAnchor(event.currentTarget)
  }

  // SUBMITTING RECORD
  const [recordBody, setRecordBody] = useState('')

  const handleSubmit = type => {
    if (type === 'closing') {
      if (recordBody != '') {
        setAux({
          surveyAnswerId: surveyAnswerId,
          ticketBody: recordBody,
          state: 'closed',
          recordType: 'closing'
        })
      }
    } else {
      if (recordBody != '') {
        setAux({
          surveyAnswerId: surveyAnswerId,
          ticketBody: recordBody,
          state: 'inProgress',
          recordType: 'followUp'
        })
      }
    }
  }

  return (
    <>
      <Button
        size="small"
        onClick={() => {
          setDialog(true)
        }}
      >
        Registro
      </Button>
      <Dialog
        open={dialog}
        onClose={handleCloseMgmtDialog}
        scroll="body"
        PaperProps={{ sx: { maxWidth: '730px' } }}
      >
        <DialogTitle
          sx={{
            fontFamily: '"Archivo Variable", sans-serif;',
            fontWeight: '400',
            fontSize: '1.2rem',
            margin: '0',
            lineHeight: '1.334',
            letterSpacing: '0em'
          }}
        >
          <Stack spacing={1} direction="row" justifyContent="flex-start" alignItems="center">
            <Typography
              sx={{
                fontFamily: '"Archivo Variable", sans-serif;',
                fontSize: '1.5rem',
                margin: '0',
                fontWeight: '400',
                lineHeight: '1.334',
                letterSpacing: '0em',
                display: 'block'
              }}
            >
              Ticket {answerId.toString().padStart(7, '0')}
            </Typography>
            <Chip
              size="small"
              sx={{
                border: '1px solid rgba(0, 0, 0, 0.08)'
              }}
              icon={
                ticketLabel.value === 'Abierto' ? (
                  <Pending fontSize="small" color="red.main" sx={{ color: 'red.main' }} />
                ) : ticketLabel.value === 'En Curso' ? (
                  <WatchLater fontSize="small" color="yellow.main" sx={{ color: '#ffc814' }} />
                ) : (
                  <CheckCircle fontSize="small" color="green.main" sx={{ color: 'green.main' }} />
                )
              }
              label={ticketLabel.value}
            />
          </Stack>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3} alignItems="center">
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={1}
              whiteSpace="nowrap"
              sx={{ width: '100%' }}
            >
              <Stack spacing={1} sx={{ width: { xs: '100%', md: '75%' } }}>
                <SimpleBar autoHide={false}>
                  <Stack direction="row" spacing={1}>
                    <LabelPill
                      icon={<Assignment fontSize="small" color="#4e4e4e" />}
                      label="Encuesta"
                      value={survey.name}
                    />
                    <LabelPill
                      icon={<Place fontSize="small" color="#4e4e4e" />}
                      label="Punto de evaluación"
                      value={evaluationGroup.name}
                    />
                    <LabelPill
                      icon={<Inbox fontSize="small" color="#4e4e4e" />}
                      label="Buzón"
                      value={commentBoxAnswer.type}
                    />
                  </Stack>
                </SimpleBar>
                <Box
                  sx={{
                    backgroundColor: 'gray.main',
                    padding: '12px 20px',
                    borderRadius: '6px',
                    minHeight: '90px'
                  }}
                >
                  <Typography variant={'caption'}>Comentario:</Typography>

                  <Typography sx={{ whiteSpace: 'pre-wrap' }}>{commentBoxAnswer.answer}</Typography>
                </Box>
              </Stack>

              {useMediaQuery(theme.breakpoints.up('md')) ? (
                <Stack
                  spacing={1}
                  direction={{ xs: 'row', md: 'column' }}
                  sx={{ width: { xs: '100%', md: '25%' } }}
                >
                  {contactFields.map((contactField, index) => {
                    return (
                      <LabelPill
                        key={index}
                        label={contactField.contactField.question}
                        value={contactField.answer}
                      />
                    )
                  })}
                </Stack>
              ) : (
                <SimpleBar autoHide={false}>
                  <Stack
                    spacing={1}
                    direction={{ xs: 'row', md: 'column' }}
                    sx={{ width: { xs: '100%', md: '20%' } }}
                  >
                    {contactFields.map((contactField, index) => {
                      return (
                        <LabelPill
                          key={index}
                          label={contactField.contactField.question}
                          value={contactField.answer}
                        />
                      )
                    })}
                  </Stack>
                </SimpleBar>
              )}
            </Stack>

            <List
              sx={{
                width: { xs: '100%' }
              }}
              subheader={<ListSubheader disableGutters>Registro</ListSubheader>}
            >
              {ticketLog.length === 0 ? (
                <Box
                  sx={{
                    display: 'flex',
                    width: '100%',
                    height: '250px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.08)'
                  }}
                >
                  Todavía no hay registros...
                </Box>
              ) : (
                ticketLog.map((record, index) => {
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

                      {Boolean(index == ticketLog.length - 1) ? '' : <Divider light />}
                    </Fragment>
                  )
                })
              )}
            </List>
          </Stack>
        </DialogContent>
        <DialogActions>
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
                disabled={ticketLabel.value == 'Resuelto' || loading.value ? true : false}
                placeholder="Cuerpo del registro"
                value={recordBody}
                onChange={event => {
                  setRecordBody(event.target.value)
                }}
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
                  disabled={ticketLabel.value == 'Resuelto' || loading.value ? true : false}
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
                    onClose={() => (anchor = null)}
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
        </DialogActions>
      </Dialog>
    </>
  )
}
export default MGMTDialog
