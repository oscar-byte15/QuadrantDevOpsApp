import React from 'react'
import { Card, CardContent, Box, Grid, Typography, Skeleton, Stack } from '@mui/material'
const CommentPageLoader = () => {
  return (
    <>
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent>
            <Skeleton width={300} height={50} />
            <Stack spacing={1}>
              <Stack direction="row" spacing={1}>
                <Skeleton variant="rounded" width={120} height={60} />
                <Skeleton variant="rounded" width={120} height={60} />
                <Skeleton variant="rounded" width={120} height={60} />
              </Stack>
              <Stack direction="row" spacing={1}>
                <Skeleton variant="rounded" width={120} height={60} />
                <Skeleton variant="rounded" width={120} height={60} />
              </Stack>
              <Card>
                <CardContent>
                  <Stack>
                    <Skeleton width={200} height={40} />
                    <Skeleton height={30} />
                    <Skeleton height={30} />
                    <Skeleton width="30%" height={30} />
                  </Stack>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Stack>
                    <Stack spacing={1} alignItems="flex-end">
                      <Stack direction={'row'} spacing={1} sx={{ width: '100%' }}>
                        <Skeleton width={20} height={30} />
                        <Skeleton width={150} height={30} />
                      </Stack>
                      <Skeleton width="30%" height={30} />
                      <Stack direction={'row'} spacing={1} sx={{ width: '100%' }}>
                        <Skeleton width={20} height={30} />
                        <Skeleton width={150} height={30} />
                      </Stack>
                      <Skeleton width="30%" height={30} />
                      <Stack direction={'row'} spacing={1} sx={{ width: '100%' }}>
                        <Skeleton width={20} height={30} />
                        <Skeleton width={150} height={30} />
                      </Stack>
                      <Skeleton width="30%" height={30} />
                      <Stack direction={'row'} spacing={1} sx={{ width: '100%' }}>
                        <Skeleton width={20} height={30} />
                        <Skeleton width={150} height={30} />
                      </Stack>
                      <Skeleton width="30%" height={30} />
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}
export default CommentPageLoader
