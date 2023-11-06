import React, { lazy } from 'react'
import { Switch, Route } from 'react-router-dom'
const List = lazy(() => import(/*webpackChunkName: "List-survey"*/ './list'))
const Add = lazy(() => import(/*webpackChunkName: "Add-survey"*/ './add'))
const Edit = lazy(() => import(/*webpackChunkName: "Edit-survey"*/ './edit'))

const Surveys = () => {
  document.title = 'Encuestas - Dashboard'
  return (
    <Switch>
      <Route exact path="/quadrant/surveys" component={List} />
      <Route path="/quadrant/surveys/addsurvey" component={Add} />
      <Route path="/quadrant/surveys/edit/:id" component={Edit} />
    </Switch>
  )
}

export default Surveys
