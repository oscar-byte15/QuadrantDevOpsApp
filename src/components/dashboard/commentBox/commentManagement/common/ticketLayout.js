import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  Typography,
  Stack,
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Link
} from '@mui/material'
import {
  CheckCircle,
  ContentCopy,
  ContentCopyTwoTone,
  CopyAll,
  Download,
  MoreVert,
  Pending,
  WatchLater
} from '@mui/icons-material'

import { toJpeg } from 'html-to-image'

import ContextData from './contextData'
import TicketColor from './TicketColor'
import MGMTCard from './mgmtCard'
import CommentCard from './commentCard'
import { useDispatch } from 'react-redux'
import { newSnackbarMessage } from 'redux/actions/snackbar/actionDispatcher'

const CommentBoxCard = ({ data }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const {
    id,
    answerId,
    commentBoxAnswer,
    survey,
    ticketLog,
    ticketState,
    evaluationGroup,
    createdAt,
    csatScore,
    npsPromoterType,
    questionAnswerList: contactFields
  } = data

  let contextData = {}
  contextData.surveyName = survey.name
  contextData.pointName = evaluationGroup.name
  contextData.commentType = commentBoxAnswer.type
  contextData.csatScore = csatScore
  contextData.npsPromoterType = npsPromoterType

  const ticket = commentBoxAnswer.ticket || answerId

  const [anchor, setAnchor] = useState(null)
  const openMenu = event => {
    setAnchor(event.currentTarget)
  }

  const createImg = () => {
    const node = document.getElementById(`comment${ticket.toString().padStart(6, '0')}`)

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
      link.download = `Ticket ${ticket.toString().padStart(6, '0')}`
      link.href = dataUrl
      link.click()
      link.remove()
    })
  }

  const ticketStateLabel = () => {
    if (ticketState) {
      switch (ticketState.status) {
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

  const [log, setLog] = useState(ticketLog)

  return (
    <Stack id={`comment${ticket.toString().padStart(6, '0')}`}>
      <TicketColor commentType={commentBoxAnswer.type} />
      <Card variant="outlined" className="comment-card" square sx={{ borderTop: '0' }}>
        <CardHeader
          disableTypography
          title={
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
                {ticket && 'Ticket ' + ticket.toString().padStart(7, '0')}
              </Typography>
              <Stack direction="row" alignItems={'flex-end'} spacing={0.5}>
                <Chip
                  size="small"
                  sx={{
                    border: '1px solid rgba(0, 0, 0, 0.08)'
                  }}
                  icon={
                    ticketLabel === 'Abierto' ? (
                      <Pending fontSize="small" color="inherit" sx={{ color: '' }} />
                    ) : ticketLabel === 'En Curso' ? (
                      <WatchLater fontSize="small" color="inherit" sx={{ color: '#ffc814' }} />
                    ) : (
                      <CheckCircle fontSize="small" color="inherit" sx={{ color: 'green.main' }} />
                    )
                  }
                  label={ticketLabel}
                />
                <Box>
                  <Link
                    onClick={() => {
                      history.push(`./${id}`)
                    }}
                    color={'primary'}
                    underline="hover"
                    variant="caption"
                  >
                    (permalink)
                  </Link>
                  <IconButton
                    size="small"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(
                          `https://qudrnt.com/?returnTo=/quadrant/commentBox/${id}`
                        )
                        dispatch(newSnackbarMessage('Permalink copiado', 'info'))
                      } catch (error) {
                        console.error('Failed to copy link URL to clipboard', error)
                      }
                      // copy params.row.linkUrl to clipboard
                    }}
                  >
                    <ContentCopyTwoTone
                      fontSize="small"
                      sx={{ fontSize: '0.857142857142857rem!important' }}
                    />
                  </IconButton>
                </Box>
              </Stack>
            </Stack>
          }
          style={{ padding: '16px 16px 0px 16px' }}
          action={
            <>
              <IconButton size="small" onClick={openMenu}>
                <MoreVert fontSize="small" />
              </IconButton>
              <Menu
                anchorEl={anchor}
                open={Boolean(anchor)}
                onClose={() => setAnchor(null)}
                keepMounted
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{ sx: { minWidth: 150 } }}
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
            </>
          }
        />
        <CardContent>
          <Stack spacing={1}>
            <Box sx={{ width: '100%' }}>
              <ContextData context={contextData} />
            </Box>
            <Stack direction={{ xs: 'column', lg: 'row' }} spacing={1}>
              <CommentCard
                commentBoxAnswer={commentBoxAnswer}
                contactFields={contactFields}
                createdAt={createdAt}
              />

              <MGMTCard
                surveyAnswerId={id}
                answerId={answerId}
                survey={survey}
                evaluationGroup={evaluationGroup}
                csatScore={csatScore}
                npsPromoterType={npsPromoterType}
                commentBoxAnswer={commentBoxAnswer}
                contactFields={contactFields}
                createdAt={createdAt}
                ticketLog={log}
                updateLog={setLog}
                ticketState={ticketState}
                ticketLabel={ticketLabel}
                setTicketLabel={setTicketLabel}
              />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  )
}
export default CommentBoxCard
