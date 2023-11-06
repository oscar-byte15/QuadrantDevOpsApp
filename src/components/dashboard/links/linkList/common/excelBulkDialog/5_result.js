import React from 'react'
import { Grid, Card, CardHeader, CardContent, Alert } from '@mui/material'
const Review = ({ used, monthlyQuota, mailsLength }) => (
  <>
    <Grid item xs={12}>
      <Grid container style={{ justifyContent: 'center' }}>
        <Grid item xs={12} md={8}>
          <Card variant="outlined">
            <CardHeader title="Enviado con éxito" />
            <CardContent>
              <Alert severity="success">
                {`!Se realizaron ${mailsLength} envios! - `}
                <strong>
                  {`Quedan ${monthlyQuota - used} envios disponibles hasta fin de mes.`}
                </strong>
              </Alert>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  </>
)
export default Review
