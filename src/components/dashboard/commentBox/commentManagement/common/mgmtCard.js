import React, { Fragment } from 'react'
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography
} from '@mui/material'
import { CheckCircle, History, Pending } from '@mui/icons-material'
import MGMTDialog from './mgmtDialog'
import Record from './record'

const MGMTCard = props => {
  const {
    surveyAnswerId,
    answerId,
    commentBoxAnswer,
    survey,
    ticketLog,
    updateLog,
    ticketState,
    evaluationGroup,
    createdAt,
    csatScore,
    npsPromoterType,
    contactFields,
    ticketLabel,
    setTicketLabel
  } = props

  const prevRecords = ticketLog.length == 1 ? 0 : ticketLog.length - 2
  const getInitials = person => {
    let initials = person
      .split(' ')
      .map(n => n[0])
      .join('')
    return initials
  }

  const limitStr = str => {
    if (str.length > 120) {
      return str.slice(0, 87).trim() + '...'
    } else {
      return str
    }
  }

  return (
    <Card
      variant="outlined"
      sx={{
        width: { xs: '100%', lg: '400px' },
        flexShrink: '0',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <CardContent sx={{ height: '100%' }}>
        <Typography
          variant="h6"
          sx={{ fontFamily: '"Archivo Variable", sans-serif;', fontWeight: '400' }}
        >
          Gestión
        </Typography>

        <List>
          {ticketLog.length === 0 ? (
            <ListItem key="zero">
              <ListItemIcon sx={{ minWidth: '32px' }}>
                <Pending />
              </ListItemIcon>
              <ListItemText primary={`No existen registros...`} />
            </ListItem>
          ) : (
            <>
              {prevRecords > 0 ? (
                <ListItem key="previous">
                  <ListItemIcon sx={{ minWidth: '32px' }}>
                    <History />
                  </ListItemIcon>
                  <ListItemText primary={`${prevRecords} registros anteriores...`} />
                </ListItem>
              ) : (
                ''
              )}

              {ticketLog.slice(-2).map((record, index) => {
                const recordType = record.recordType
                const isLast = Boolean(index == ticketLog.length - 1 - prevRecords)

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
                      body={limitStr(record.body)}
                      initials={getInitials(record.name)}
                      user={record.name}
                      createdAt={createdAt}
                    />

                    {isLast ? '' : <Divider light />}
                  </Fragment>
                )
              })}
            </>
          )}
        </List>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <MGMTDialog
          surveyAnswerId={surveyAnswerId}
          answerId={answerId}
          survey={survey}
          evaluationGroup={evaluationGroup}
          csatScore={csatScore}
          npsPromoterType={npsPromoterType}
          commentBoxAnswer={commentBoxAnswer}
          contactFields={contactFields}
          createdAt={createdAt}
          ticketLog={ticketLog}
          ticketState={ticketState}
          ticketLabel={ticketLabel}
          setTicketLabel={setTicketLabel}
          updateLog={updateLog}
        />
      </CardActions>
    </Card>
  )
}
export default MGMTCard
