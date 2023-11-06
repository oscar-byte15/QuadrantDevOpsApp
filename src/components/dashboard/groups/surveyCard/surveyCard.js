import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Card, CardActions, Button, CardHeader, Typography } from '@mui/material'

class SurveyCard extends Component {
  render() {
    return (
      <Card variant="outlined" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardHeader
          disableTypography
          title={<Typography variant="body1">{this.props.survey.name}</Typography>}
          style={{ flexGrow: '2' }}
        />
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => this.props.handleDiscard(this.props.survey)}
          >
            Desvincular
          </Button>
        </CardActions>
      </Card>
    )
  }
}

export default withRouter(SurveyCard)
