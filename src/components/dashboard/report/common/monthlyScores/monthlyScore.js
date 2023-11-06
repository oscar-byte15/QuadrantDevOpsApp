import React from 'react'
import {
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material'

const getClassName = score => {
  let _class = 'score-card__score'
  _class += score > 0 ? ' green' : score < 0 ? ' red' : ' yellow'
  return _class
}

const MonthlyScore = props => {
  const {
    scoreType = 'CSAT',
    scores: { actualMonth, prevYear }
  } = props
  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h1" align="center" className={getClassName(actualMonth.score)}>
            {actualMonth.score ? actualMonth.score : 0}
          </Typography>
          <Typography variant="h5" align="center">
            {scoreType.toUpperCase()}
          </Typography>
          <Typography variant="body1" align="center">
            {actualMonth.qty} respuestas capturadas
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" style={{ margin: '15px 0 0 0', opacity: '0.8' }}>
            Hace un año
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <List
            style={{
              textTransform: 'capitalize'
            }}
          >
            <ListItem>
              <ListItemText primary={prevYear.label} secondary={`${prevYear.qty} respuestas`} />
              <ListItemSecondaryAction>
                <Typography>{prevYear.score ? prevYear.score : 0}</Typography>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </>
  )
}
export default MonthlyScore
