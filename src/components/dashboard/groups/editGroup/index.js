import React from 'react'
import GroupForm from '../groupForm'
import { Grid, Card, CardContent, CardHeader, CircularProgress, Skeleton } from '@mui/material'
import httpModule from 'services/httpModule'
import BodyCard from 'components/common/bodyCard'

const EditGroup = props => {
  const id = props.match.params.id
  const [group, setGroup] = useState({ data: undefined, loading: true })

  // useEffect(() => {
  //   if (id)
  //     httpModule.get('/v1/evaluationGroups/' + id).then(res => {
  //       setGroup({ data: res.data, loading: false })
  //     })
  // }, [id])

  return group.loading ? (
    <BodyCard>
      <CardHeader title={<Skeleton width={280} />} subheader={<Skeleton width={180} />} />
      <CardContent
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '500px'
        }}
      >
        <CircularProgress />
      </CardContent>
    </BodyCard>
  ) : (
    <GroupForm group={group.data} />
  )
}

export default EditGroup
