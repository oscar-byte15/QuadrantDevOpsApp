import React from 'react'
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CircularProgress,
  Typography
} from '@mui/material'

const KPI = props => {
  let loading = props.loading

  const score = props.score
  const kpi = props.title
  const goal = props.goal
  const bottom = props.bottom

  const titleFormatter = kpi => {
    switch (kpi) {
      case 'nps':
        return 'NPS'
      case 'csat':
        return 'CSAT'
      case 'retorno':
        return 'Retorno'
    }
  }

  const barColor = (goal, score) => {
    if (goal ? score >= goal : score >= 50) {
      return '#53dd6c'
    }
    if (goal && bottom ? score < goal && score > bottom : score < 50 && score > 10) {
      return '#eec643'
    } else {
      return '#ff7750'
    }
  }

  const scoreIndicator = score => {
    if (score == 0) {
      return 0
    } else if (score > 0) {
      return parseFloat(score)
    } else {
      return 100 + parseFloat(score)
    }
  }

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          borderColor: '#dddddd',
          position: 'relative',
          minWidth: '150px',
          minHeight: '108px'
        }}
      >
        {loading == true ? (
          <Box
            sx={{
              position: 'absolute',
              inset: '0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ffffff',
              width: '100%',
              zIndex: '50',
              opacity: '0.5'
            }}
          >
            <CircularProgress size={30} />
          </Box>
        ) : (
          ''
        )}
        <CardContent sx={{ position: 'relative', zIndex: '10' }}>
          <Typography
            sx={{ fontSize: 16, fontWeight: '500', color: '#2d2d2d' }}
            color="text.secondary"
            gutterBottom
          >
            {titleFormatter(kpi)}
          </Typography>
          <div style={{ height: '24px' }}>
            <Typography
              variant={score ? 'body1' : 'caption'}
              sx={{ fontSize: score ? 16 : 'auto' }}
            >
              {score ? score : loading == true ? '...' : 'No hay datos'}
            </Typography>
          </div>
        </CardContent>

        <Box
          sx={{
            position: 'relative',
            height: '20px',
            width: '100%',
            left: '0',
            right: '0',
            bottom: '0',
            zIndex: '20',
            padding: '0.2rem',
            borderTop: '1px #dddddd solid',
            background:
              score == 0 || score == undefined
                ? '#f1f1f1'
                : score > 0
                ? `linear-gradient(90deg, ${barColor(goal, score)} 0%, ${barColor(
                    goal,
                    score
                  )} ${scoreIndicator(score)}%, #f1f1f1 ${scoreIndicator(score)}%)!important`
                : `linear-gradient(90deg, #f1f1f1 0%,#f1f1f1 ${scoreIndicator(score)}% ,${barColor(
                    goal,
                    score
                  )} ${scoreIndicator(score)}%)!important`
          }}
        >
          {goal ? (
            <div
              style={{
                position: 'absolute',
                height: '100%',
                width: '1px',
                backgroundColor: '#828282',
                left: `${goal}%`,
                top: '0px',
                zIndex: '0'
              }}
            />
          ) : (
            ''
          )}
          {goal && score ? (
            <Typography
              display="block"
              align="left"
              variant="caption"
              sx={{
                fontWeight: '700',
                lineHeight: '1',
                position: 'absolute',
                left:
                  score >= 0
                    ? `Calc(${+goal + (score - goal) * 0.5}% - 30px)`
                    : score >= goal
                    ? `Calc(${+score + (goal - score) * 0.5}% - 30px)`
                    : '50%',
                top: '4px',
                padding: '2px'
              }}
            >
              dif: {(score - goal).toFixed(2)}
            </Typography>
          ) : (
            ''
          )}
          {goal ? (
            <Typography
              display="block"
              align="left"
              variant="caption"
              sx={{
                fontWeight: '700',
                lineHeight: '1',
                position: 'absolute',
                left: goal > 50 ? `Calc(${goal}% - 45px)` : `Calc(${goal}%)`,
                top: '-14px',
                padding: '2px'
              }}
            >
              meta {goal}
            </Typography>
          ) : (
            ''
          )}
          {score == undefined ? (
            <Typography
              display="block"
              align="left"
              variant="caption"
              sx={{
                fontWeight: '700',
                lineHeight: '1',
                position: 'absolute',
                left: '14px',
                top: '4px',
                padding: '2px'
              }}
            >
              No hay datos
            </Typography>
          ) : (
            ''
          )}
        </Box>
      </Card>
    </>
  )
}

export default KPI
