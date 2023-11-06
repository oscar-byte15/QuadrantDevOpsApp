import React, { useState, useEffect } from 'react'
import {
  CardHeader,
  CardContent,
  CardActions,
  Card,
  Grid,
  Pagination,
  Typography
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import CommentCardLoader from './commentCardLoader'
import Filter from './filter'
import TicketLayout from './common/ticketLayout'
import { getComments } from 'services/web_services/commentBox'
import {
  cleanFilterVisibility,
  filterInCommentManagement
} from 'redux/actions/filter/actionDispatcher'
import BodyCard from 'components/common/bodyCard'

const CommentBoxManagement = _ => {
  const dispatch = useDispatch()
  const { commentBoxFilter, selectedGroups, selectedSurveys, startDate, endDate } = useSelector(
    state => state.filter
  )
  const [page, setPage] = useState(1)

  const handleChange = (_, value) => {
    setPage(value)
  }

  const [comments, setComments] = useState({ data: {}, loading: true, error: false })

  useEffect(() => {
    setPage(1)
  }, [commentBoxFilter])

  useEffect(() => {
    window.scrollTo(0, 0)
    setComments({ loading: true })
    getComments({
      ...commentBoxFilter,
      page,
      selectedGroups,
      selectedSurveys,
      startDate,
      endDate
    }).then(res => {
      setComments({ ...comments, data: res.data, loading: false })
    })
  }, [commentBoxFilter, page, selectedGroups, selectedSurveys, startDate, endDate])

  useEffect(() => {
    dispatch(filterInCommentManagement())
    return () => dispatch(cleanFilterVisibility())
  }, [dispatch])

  const { data, loading } = comments

  return (
    <BodyCard>
      <CardHeader title="Gestor de Comentarios" subheader="Lista de comentarios" />
      <CardContent>
        <Grid container className="quadrant-container-card__content" spacing={2}>
          <Filter />
          {loading ? (
            <>
              <CommentCardLoader />
              <CommentCardLoader />
              <CommentCardLoader />
              <CommentCardLoader />
            </>
          ) : (
            <>
              {data?.docs?.map(
                surveyAnswer =>
                  surveyAnswer.commentBoxAnswer && (
                    <Grid key={surveyAnswer.id} item xs={12}>
                      <TicketLayout data={surveyAnswer} />
                    </Grid>
                  )
              )}
              {data?.surveyAnswers?.docs.length === 0 && <h4>No hay comentarios </h4>}
            </>
          )}
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container justifyContent="center" item xs={12}>
          <Pagination
            count={data?.totalPages}
            page={page}
            onChange={handleChange}
            color="primary"
          />
        </Grid>
      </CardActions>
    </BodyCard>
  )
}
export default CommentBoxManagement
