import React, { useEffect, useState } from 'react'
import { Box, Card, CardContent, CircularProgress, Stack, Typography } from '@mui/material'

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-toward-subtle.css'

const CommentSummary = props => {
  const loading = props.loading
  const data = props.data ? props.data : []

  const title = data.type

  const quantity = data.now?.quantity
  const quantityBefore = data.before?.quantity

  const quantityDiff = data.diff?.quantity

  const congrats = data.now?.congratulations.quantity
  const congratsBefore = data.before?.congratulations.quantity
  const congratsShare = data.now?.congratulations.share
  const congratsDiff = data.diff?.congratulations

  const complaints = data.now?.complaints.quantity
  const complaintsBefore = data.before?.complaints.quantity
  const complaintsShare = data.now?.complaints.share
  const complaintsDiff = data.diff?.complaints

  const suggestions = data.now?.suggestions.quantity
  const suggestionsBefore = data.before?.suggestions.quantity
  const suggestionsShare = data.now?.suggestions.share
  const suggestionsDiff = data.diff?.suggestions

  const general = data.now?.general.quantity
  const generalBefore = data.before?.general.quantity
  const generalShare = data.now?.general.share
  const generalDiff = data.diff?.general

  const startDate = data.now?.startDate
  const endDate = data.now?.endDate
  const startDateBefore = data.before?.startDate
  const endDateBefore = data.before?.endDate

  const goal = props.goal
  const bottom = props.bottom

  const roundNicely = number => {
    return Math.round((number + Number.EPSILON - 1) * 10000) / 100
  }

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          borderColor: '#dddddd',
          position: 'relative',
          minWidth: { xs: '100%', sm: '350px' },
          minHeight: '146.09px'
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
                    textTransform: 'capitalize',
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
                    visibility: loading == true || quantity == 0 ? 'hidden' : 'visible'
                  }}
                >
                  <Typography
                    gutterBottom
                    variant={loading == true ? 'caption' : 'caption'}
                    sx={{
                      lineHeight: '1',
                      margin: '0'
                    }}
                  >
                    {quantity
                      ? `${new Intl.NumberFormat('en').format(quantity)} en total`
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
                  <Typography
                    sx={{
                      fontSize: quantity != 0 ? '2.4rem' : loading == true ? '0.75rem' : '0.75rem',
                      lineHeight: '1',
                      fontWeight: '700',
                      fontFamily: '"Roboto", sans-serif'
                    }}
                  >
                    {quantity != 0 ? '' : loading == true ? '...' : 'No hay datos'}
                  </Typography>
                </div>
              </Stack>
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
                  loading | (quantity == 0)
                    ? '#f1f1f1'
                    : `linear-gradient(90deg, ${
                        congratsShare == 0 ? '' : `#47bb5c 0%, #47bb5c ${congratsShare}%, `
                      } ${
                        (suggestionsShare != 0) | (congratsShare != 0)
                          ? `#eec643 ${congratsShare}%, `
                          : ''
                      } #eec643 ${suggestionsShare}%,#eec643 ${
                        suggestionsShare + congratsShare
                      }%, #ff7750 ${suggestionsShare + congratsShare}%, #ff7750 ${
                        suggestionsShare + congratsShare + complaintsShare
                      }%) !important`,
                userSelect: 'none'
              }}
            >
              {congratsShare == 0 || quantity == 0 || loading ? (
                ''
              ) : (
                <Stack
                  spacing={0.3}
                  sx={{
                    lineHeight: '1',
                    position: 'absolute',
                    whiteSpace: 'nowrap',
                    left: '10px',
                    top: '-44px',
                    zIndex: '1'
                  }}
                >
                  {Math.abs(roundNicely(congratsDiff)) != Infinity ? (
                    <Stack
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                      sx={{
                        visibility: (loading == true) | (quantity == 0) ? 'hidden' : 'visible',
                        color: roundNicely(congratsDiff) <= 0.0 ? 'red.main' : 'green.main'
                      }}
                    >
                      <Tippy
                        allowHTML={true}
                        content={
                          <>
                            <Typography>
                              Felicitaciones del periodo anterior:{' '}
                              <strong>{`${new Intl.NumberFormat('en').format(
                                congratsBefore
                              )}`}</strong>
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
                        <Typography
                          display="block"
                          align="left"
                          variant="caption"
                          sx={{ fontWeight: '500', lineHeight: '1', backgroundColor: '#ffffff' }}
                        >
                          {roundNicely(congratsDiff) > 0
                            ? `+${roundNicely(congratsDiff)}%`
                            : `${roundNicely(congratsDiff)}%`}
                        </Typography>
                      </Tippy>
                    </Stack>
                  ) : (
                    ''
                  )}

                  <Typography
                    display="block"
                    align="left"
                    variant="caption"
                    sx={{ fontWeight: '500', lineHeight: '1', backgroundColor: '#ffffff' }}
                  >{`${new Intl.NumberFormat('en').format(congrats)} felicitaciones`}</Typography>
                  <Typography
                    display="block"
                    align="left"
                    variant="caption"
                    sx={{ fontWeight: '500', lineHeight: '1' }}
                  >
                    {`${congratsShare?.toFixed(2)}%`}
                  </Typography>
                </Stack>
              )}

              {suggestionsShare == 0 || quantity == 0 || loading ? (
                ''
              ) : (
                <>
                  <Stack
                    spacing={0.3}
                    sx={{
                      lineHeight: '1',
                      position: 'absolute',
                      whiteSpace: 'nowrap',
                      margin: '0!important',
                      zIndex: '1',
                      left:
                        congratsShare + suggestionsShare > 70
                          ? complaintsShare == 0
                            ? `Calc(${congratsShare}% - 50px)`
                            : `Calc(100% - 170px )`
                          : `Calc(${congratsShare}% + 0px)`,
                      top: congratsShare < 25 ? '-70px' : '-44px'
                    }}
                  >
                    {Math.abs(roundNicely(suggestionsDiff)) != Infinity ? (
                      <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        sx={{
                          visibility: (loading == true) | (quantity == 0) ? 'hidden' : 'visible',
                          color: roundNicely(suggestionsDiff) <= 0.0 ? 'red.main' : 'green.main'
                        }}
                      >
                        <Tippy
                          allowHTML={true}
                          content={
                            <>
                              <Typography>
                                Sugerencias del periodo anterior:{' '}
                                <strong>{`${new Intl.NumberFormat('en').format(
                                  suggestionsBefore
                                )}`}</strong>
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
                          <Typography
                            display="block"
                            align="left"
                            variant="caption"
                            sx={{ fontWeight: '500', lineHeight: '1', backgroundColor: '#ffffff' }}
                          >
                            {roundNicely(suggestionsDiff) > 0
                              ? `+${roundNicely(suggestionsDiff)}%`
                              : `${roundNicely(suggestionsDiff)}%`}
                          </Typography>
                        </Tippy>
                      </Stack>
                    ) : (
                      ''
                    )}

                    <Typography
                      display="block"
                      align="left"
                      variant="caption"
                      sx={{ fontWeight: '500', lineHeight: '1' }}
                    >{`${new Intl.NumberFormat('en').format(suggestions)} sugerencias`}</Typography>
                    <Typography
                      display="block"
                      align="left"
                      variant="caption"
                      sx={{ fontWeight: '500', lineHeight: '1' }}
                    >
                      {`${suggestionsShare?.toFixed(2)}%`}
                    </Typography>
                  </Stack>

                  <div
                    style={{
                      position: 'absolute',
                      height: congratsShare < 25 ? '150%' : '50%',
                      width: '1px',
                      backgroundColor: '#828282',
                      left: `${congratsShare}%`,
                      marginLeft: '0!important',
                      bottom: '20px',
                      zIndex: '0'
                    }}
                  />
                </>
              )}

              {complaintsShare == 0 || quantity == 0 || loading ? (
                ''
              ) : (
                <Stack
                  spacing={0.3}
                  sx={{
                    lineHeight: '1',
                    position: 'absolute',
                    whiteSpace: 'nowrap',
                    margin: '0!important',
                    right: '10px',
                    top: '-44px',
                    zIndex: '1'
                  }}
                >
                  {Math.abs(roundNicely(complaintsDiff)) != Infinity ? (
                    <Stack
                      direction="row"
                      justifyContent="flex-end"
                      alignItems="center"
                      sx={{
                        visibility: (loading == true) | (quantity == 0) ? 'hidden' : 'visible',
                        color: roundNicely(complaintsDiff) <= 0.0 ? 'green.main' : 'red.main'
                      }}
                    >
                      <Tippy
                        allowHTML={true}
                        content={
                          <>
                            <Typography>
                              Reclamos del periodo anterior:{' '}
                              <strong>{`${new Intl.NumberFormat('en').format(
                                complaintsBefore
                              )}`}</strong>
                            </Typography>
                            <Typography
                              display="block"
                              variant="caption"
                              sx={{ whiteSpace: 'nowrap', marginTop: '0.8rem' }}
                            >{`Periodo comparación: ${startDateBefore} - ${endDateBefore}`}</Typography>
                          </>
                        }
                        placement="top-end"
                        animation="shift-toward-subtle"
                      >
                        <Typography
                          display="block"
                          align="left"
                          variant="caption"
                          sx={{ fontWeight: '500', lineHeight: '1', backgroundColor: '#ffffff' }}
                        >
                          {roundNicely(complaintsDiff) > 0
                            ? `+${roundNicely(complaintsDiff)}%`
                            : `${roundNicely(complaintsDiff)}%`}
                        </Typography>
                      </Tippy>
                    </Stack>
                  ) : (
                    ''
                  )}

                  <Typography
                    display="block"
                    align="left"
                    variant="caption"
                    sx={{ fontWeight: '500', lineHeight: '1' }}
                  >{`${new Intl.NumberFormat('en').format(complaints)} reclamos`}</Typography>
                  <Typography
                    display="block"
                    align="right"
                    variant="caption"
                    sx={{ fontWeight: '500', lineHeight: '1' }}
                  >
                    {`${complaintsShare?.toFixed(2)}%`}
                  </Typography>
                </Stack>
              )}
            </Box>
          </>
        )}
      </Card>
    </>
  )
}

export default CommentSummary
