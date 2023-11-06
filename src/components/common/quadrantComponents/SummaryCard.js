import React, { useEffect, useState } from 'react'
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Stack,
  Typography
} from '@mui/material'
import { ArrowDropDown, ArrowDropUp, Remove } from '@mui/icons-material'

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-toward-subtle.css'

const roundNicely = number => {
  return Math.round((number + Number.EPSILON - 1) * 10000) / 100
}

const Summary = props => {
  const loading = props.loading
  const data = props.data ? props.data : []

  const title = data.type

  const score = title === 'Otros' ? data.score : data.now?.score
  const scoreBefore = title === 'Otros' ? data.score : data.before?.score

  const quantity = data.now?.quantity
  const quantityBefore = data.before?.quantity

  const scoreDiff = data.diff?.score
  const quantityDiff = data.diff?.quantity

  const startDate = data.now?.startDate
  const endDate = data.now?.endDate
  const startDateBefore = data.before?.startDate
  const endDateBefore = data.before?.endDate

  const goal = props.goal
  const bottom = props.bottom

  const barColor = (goal, score, quantity, loading) => {
    if (quantity == 0 || loading == true) {
      return '#2d2d2d'
    }
    if (goal ? score >= goal : score >= 50) {
      return '#47bb5c'
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
          minWidth: '175px',
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
          <>
            <CardContent sx={{ position: 'relative', zIndex: '10' }}>
              <Stack spacing={0.5}>
                <Typography
                  sx={{
                    fontSize: '1.4rem',
                    fontWeight: '500',
                    color: '#2d2d2d',
                    lineHeight: '1'
                  }}
                  color="text.secondary"
                >
                  {title}
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={0.5}
                  flexWrap="nowrap"
                  sx={{
                    visibility: (loading == true) | (quantity == 0) ? 'hidden' : 'visible'
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="caption"
                    sx={{
                      visibility: (loading == true) | (quantity == 0) ? 'hidden' : 'visible',
                      lineHeight: '1',
                      margin: '0',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {quantity
                      ? `${new Intl.NumberFormat('en').format(quantity)} respuestas`
                      : loading == true
                      ? '...'
                      : 'No hay datos'}
                  </Typography>

                  <Tippy
                    allowHTML={true}
                    content={
                      <>
                        <Typography>
                          Respuestas del periodo anterior:{' '}
                          <strong>{`${new Intl.NumberFormat('en').format(quantityBefore)}`}</strong>
                        </Typography>
                        <Typography
                          display="block"
                          variant="caption"
                          sx={{ whiteSpace: 'nowrap', marginTop: '0.8rem' }}
                        >{`Periodo comparación: ${startDateBefore} - ${endDateBefore}`}</Typography>
                      </>
                    }
                    placement="top-start"
                    animation="shift-toward-subtle"
                  >
                    {Math.abs(roundNicely(quantityDiff)) != Infinity ? (
                      <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        sx={{
                          color: roundNicely(quantityDiff) <= 0.0 ? 'red.main' : 'green.main'
                        }}
                      >
                        <Typography
                          gutterBottom
                          display="inline"
                          variant={loading == true ? 'caption' : 'caption'}
                          sx={{
                            lineHeight: '1',
                            margin: '0'
                          }}
                        >
                          {quantity
                            ? `(${
                                roundNicely(quantityDiff) > 0
                                  ? `+${roundNicely(quantityDiff)}`
                                  : roundNicely(quantityDiff)
                              }%)`
                            : loading == true
                            ? '...'
                            : 'No hay datos'}
                        </Typography>
                      </Stack>
                    ) : (
                      ''
                    )}
                  </Tippy>
                </Stack>
                <div
                  style={{
                    height: '34px',
                    marginTop: '24px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end'
                  }}
                >
                  {score != '-' && Math.abs(roundNicely(scoreDiff)) != Infinity ? (
                    <Tippy
                      allowHTML={true}
                      content={
                        <>
                          <Typography>
                            Puntaje del periodo anterior: <strong>{`${scoreBefore}`}</strong>
                          </Typography>
                          <Typography
                            display="block"
                            variant="caption"
                            sx={{ whiteSpace: 'nowrap', marginTop: '0.8rem' }}
                          >{`Periodo comparación: ${startDateBefore} - ${endDateBefore}`}</Typography>
                        </>
                      }
                      placement="bottom-start"
                      animation="shift-toward-subtle"
                    >
                      <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        sx={{
                          visibility: (loading == true) | (quantity == 0) ? 'hidden' : 'visible',
                          color: roundNicely(scoreDiff) <= 0.0 ? 'red.main' : 'green.main',
                          marginBottom: '2px',
                          marginRight: '8px'
                        }}
                      >
                        {roundNicely(scoreDiff) < 0.0 ? (
                          <ArrowDropDown sx={{ fontSize: '1.25rem' }} />
                        ) : roundNicely(scoreDiff) > 0.0 ? (
                          <ArrowDropUp sx={{ fontSize: '1.25rem' }} />
                        ) : (
                          ''
                        )}

                        <Typography
                          gutterBottom
                          display="inline"
                          variant={'caption'}
                          sx={{
                            lineHeight: '1',
                            margin: '0'
                          }}
                        >
                          {quantity
                            ? `${roundNicely(scoreDiff)}%`
                            : loading == true
                            ? '...'
                            : 'No hay datos'}
                        </Typography>
                      </Stack>
                    </Tippy>
                  ) : (
                    ''
                  )}
                  <Typography
                    variant={quantity == 0 ? 'caption' : 'body1'}
                    align="right"
                    display="block"
                    sx={{
                      fontSize: (loading == true) | (quantity == 0) ? 'auto' : '2.4rem',
                      lineHeight: '1',
                      fontWeight: '700',
                      fontFamily: '"Roboto", sans-serif',
                      color: barColor(goal, score, quantity, loading)
                    }}
                  >
                    {score ? (score == '-' ? '' : score) : loading == true ? '...' : 'No hay datos'}
                  </Typography>
                </div>
              </Stack>
            </CardContent>
            <CardActions
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
                  score == 0 || score == undefined || score == '-'
                    ? '#f1f1f1'
                    : score > 0
                    ? `linear-gradient(90deg, ${barColor(goal, score)} 0%, ${barColor(
                        goal,
                        score
                      )} ${scoreIndicator(score)}%, #f1f1f1 ${scoreIndicator(score)}%)!important`
                    : `linear-gradient(90deg, #f1f1f1 0%,#f1f1f1 ${scoreIndicator(
                        score
                      )}% ,${barColor(goal, score)} ${scoreIndicator(score)}%)!important`
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
            </CardActions>
          </>
        )}
      </Card>
    </>
  )
}

export default Summary
