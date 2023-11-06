import React from 'react'
import { Switch, Route } from 'react-router-dom'
import QuadrantClients from './quadrantClients/quadrantClients'
import Users from './users/users'
import SurveyListAdmin from './surveyAdmin/surveyCardAdmin'
import SurveyList from '../dashboard/surveys/list/index'

export default function Admin() {
  return (
    <Switch>
      <Route path="/admin/clients" component={QuadrantClients} />
      <Route path="/admin/users" component={Users} />
      <Route path="/admin/surveyAdmin" component = {SurveyListAdmin}></Route>
    </Switch>
  )
}
