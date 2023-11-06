import React, { Component } from 'react'
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
  CardHeader,
  Stack,
  Box,
  IconButton,
  Divider
} from '@mui/material'
import Dropdown from '../../common/controlledDropdown'
import Switch from '../../common/controlledSwitch'
import EditQuestion from 'components/dashboard/addQuestion/addQuestion'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-toward-subtle.css'
import { Delete } from '@mui/icons-material'

class QuestionCard extends Component {
  render() {
    return (
      <Card className="card" variant="outlined" square>
        <CardContent>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            alignItems={{ xs: 'flex-start', sm: 'flex-start' }}
          >
            <Box>
              <Dropdown
                size="small"
                label="Prioridad"
                margin="dense"
                name={`csat.questionList.${this.props.index}.priority`}
                sx={{ width: '105px' }}
                options={[
                  { id: 0, name: 'Estándar' },
                  1,
                  2,
                  3,
                  4,
                  5,
                  6,
                  7,
                  8,
                  9,
                  10,
                  11,
                  12,
                  13,
                  14,
                  15,
                  16,
                  17,
                  18,
                  19,
                  20
                ]}
              />
            </Box>
            <Divider orientation="vertical" flexItem />
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1}
              justifyContent="flex-end"
              alignItems={{ xs: 'flex-end', sm: 'center' }}
              sx={{ width: '100%', minHeight: '50px' }}
            >
              <Box sx={{ width: '100%' }}>
                <Typography
                  variant="body1"
                  style={{
                    fontWeight: '400',
                    fontSize: '1.15rem'
                  }}
                  gutterBottom
                >
                  {this.props.question.question}
                </Typography>
                <Typography variant="body1" sx={{ color: '#2d2d2de8' }}>
                  {this.props.question.translate}
                </Typography>
              </Box>

              <Stack direction="row" alignItems="center">
                <EditQuestion
                  question={this.props.question}
                  variant="outlined"
                  title="Editar Pregunta Csat"
                  buttonText="Editar"
                  label="Pregunta"
                  handleEdit={this.props.handleEdit}
                  helperText=""
                  color="primary"
                />

                {this.props.question.id ? (
                  <Tippy
                    content="Activar o desactivar pregunta en encuesta"
                    placement="bottom"
                    animation="shift-toward-subtle"
                  >
                    <Switch
                      name={`csat.questionList.${this.props.index}.enabled`}
                      label=""
                      color="secondary"
                      size="small"
                    />
                  </Tippy>
                ) : (
                  <Tippy
                    content="Eliminar pregunta de la encuesta"
                    placement="bottom"
                    animation="shift-toward-subtle"
                  >
                    <IconButton
                      // color="secondary"
                      onClick={() => this.props.handleDiscard(this.props.index)}
                    >
                      <Delete />
                    </IconButton>
                  </Tippy>
                )}
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    )
  }
}

export default QuestionCard
