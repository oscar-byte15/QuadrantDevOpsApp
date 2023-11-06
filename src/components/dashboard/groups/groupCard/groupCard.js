import React from 'react'
import { useHistory } from 'react-router-dom'
import { Card, Button, CardHeader, CardContent, CardActions, Typography } from '@mui/material'

const GroupCard = props => {
  const history = useHistory()
  let { updatedAt, city, country, name, id } = props.evaluationGroup
  let date = new Date(updatedAt)
  const onClickEdit = () =>
    history.push({
      pathname: '/quadrant/groups/editgroup',
      state: { id: id }
    })

  return (
    <Card variant="outlined" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        disableTypography
        title={<Typography variant="body1">{name}</Typography>}
        subheader={
          <Typography variant="body2">{city?.name + ', ' + country?.name || ''}</Typography>
        }
      />
      <CardContent style={{ flexGrow: '2' }}>
        <Typography variant="body2">
          {`Editado: ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={onClickEdit}>
          Editar
        </Button>
      </CardActions>
    </Card>
  )
}

export default GroupCard
