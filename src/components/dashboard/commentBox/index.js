import React from 'react'
import { Switch, Route } from 'react-router-dom'
const TextAnalysis = React.lazy(() => import(/*webpackChunkName: "textAnalysis"*/ './textAnalysis'))
const SingleCommentManagement = React.lazy(() => import(/*webpackChunkName: "textAnalysis"*/ './singleCommentManagement'))

const Management = React.lazy(() =>
  import(/*webpackChunkName: "management"*/ './commentManagement')
)


const CommentBox = () => (
  <Switch>
    <Route path="/quadrant/commentBox/textAnalysis" component={TextAnalysis} />
    <Route path="/quadrant/commentBox/management" component={Management} />
    <Route path="/quadrant/commentBox/:id" component={SingleCommentManagement} />
  </Switch>
)

export default CommentBox
