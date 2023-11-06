import React, { Component } from 'react'
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
  FormControl,
  Switch,
  InputLabel,
  Select,
  Input,
  MenuItem,
  CardHeader
} from '@mui/material'

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-toward-subtle.css'

class QuestionCard extends Component {
  render() {
    return (
      <Card className="card" variant="outlined" square style={{ height: '100%' }}>
        <CardHeader
          disableTypography
          title={
            <Typography
              variant="h6"
              style={{
                color: '#2d2d2de8',
                fontWeight: '400',
                fontSize: '1.15rem'
              }}
            >
              {this.props.question.question}
            </Typography>
          }
          subheader={<Typography variant="body1">{this.props.question.translate}</Typography>}
        />
        <CardContent style={{ height: '100%', paddingTop: '0px' }}>
          <Grid container spacing={1} style={{ height: '100%' }}>
            <Grid item xs={12} sm={4} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="CsatQuantity">Prioridad</InputLabel>
                <Select input={<Input defaultValue="0" name="CsatQuantity" label="Prioridad" />}>
                  <MenuItem value="0">Estandar</MenuItem>
                  <MenuItem>1</MenuItem>
                  <MenuItem>2</MenuItem>
                  <MenuItem>3</MenuItem>
                  <MenuItem>4</MenuItem>
                  <MenuItem>5</MenuItem>
                  <MenuItem>6</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          {
            //TODO mostrar solo para preguntas ya creadas
          }
          <Tippy
            content="Activar o desactivar pregunta en encuesta"
            placement="bottom"
            animation="shift-toward-subtle"
          >
            <Switch checked name="checkedB" color="secondary" size="small" />
          </Tippy>
          {
            //TODO manejar handle discard dependiendo de si es un campo recien agregado
          }
          <Tippy
            content="Eliminar pregunta de la encuesta"
            placement="bottom"
            animation="shift-toward-subtle"
          >
            <Button color="primary" onClick={() => this.props.handleDiscard()}>
              Descartar
            </Button>
          </Tippy>
          <Button color="primary">Editar</Button>
        </CardActions>
      </Card>
    )
  }
}

export default QuestionCard
