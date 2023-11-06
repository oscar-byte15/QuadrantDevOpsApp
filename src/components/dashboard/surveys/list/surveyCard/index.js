import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Card, CardHeader, CardActions, CardContent, Button, Typography } from '@mui/material'

class SurveyCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nps: this.props.survey.nps?.enabled ? ' + NPS' : ''
    }
  }

  render() {
    let date = new Date(this.props.survey.updatedAt)
    return (
      <Card variant="outlined">
        <CardHeader
          disableTypography
          title={<Typography variant="body1">{this.props.survey.name}</Typography>}
          titleTypographyProps={{ className: 'title' }}
        />
        <CardContent>
          <Typography variant="body2">
            {'Editado: ' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="text"
            color="primary"
            onClick={() => {
              this.props.history.push({
                pathname: '/quadrant/surveys/editSurvey',
                state: { id: this.props.survey.id }
              })
            }}
          >
            Editar
          </Button>
        </CardActions>
      </Card>
    )
  }
}

export default withRouter(SurveyCard)
