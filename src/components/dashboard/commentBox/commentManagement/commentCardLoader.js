import React from 'react'
import { Card, CardContent, Box, Grid, Typography, Skeleton } from '@mui/material'
const CommentCardLoader = () => {
  return (
    <>
      <Grid item xs={12}>
        <Card variant="outlined" className="comment-card" square>
          <Box display="flex">
            <Box
              className="comment-card__color-code"
              style={{
                maxWidth: '7px',
                minWidth: '7px'
              }}
            />
            <Box className="comment-card__body" flexGrow={1} flexShrink={0}>
              <Typography variant="h5" style={{ padding: '16px 16px 0px 16px ' }}>
                <Skeleton width={120} />
              </Typography>
              <CardContent>
                <Grid
                  container
                  spacing={2}
                  style={{ flexWrap: 'nowrap' }}
                  className="comment-card__data-area"
                >
                  <Grid item xs={12} sm="auto" className="comment-card__contact-area">
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                  </Grid>
                  <Grid item xs={12} sm="auto" className="comment-card__comment-area">
                    <Typography
                      variant="body1"
                      gutterBottom
                      align="justify"
                      style={{ padding: '0 10px 10px 10px' }}
                    >
                      <Skeleton style={{ backgroundColor: 'transparent' }} />
                      <Skeleton />
                      <Skeleton />
                    </Typography>
                    <Grid container justifyContent="flex-end">
                      <Typography
                        variant="body1"
                        display="inline"
                        align="right"
                        style={{ padding: '0px 10px 0px 10px' }}
                        color="textSecondary"
                      >
                        <Skeleton width={100} />
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Box>
          </Box>
        </Card>
      </Grid>
    </>
  )
}
export default CommentCardLoader
