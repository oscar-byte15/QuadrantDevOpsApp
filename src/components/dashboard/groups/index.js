import React, { lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ClientAdminAuthRoute } from '../../routes/authRoutes'

const GroupsList = lazy(() => import(/*webpackChunkName: "List-group"*/ './groupsList'))
const GroupForm = lazy(() => import(/*webpackChunkName: "Add-group"*/ './groupForm'))
const EditGroup = lazy(() => import(/*webpackChunkName: "Edit-groups"*/ './editGroup'))

export default function Groups() {
  return (
    <Switch>
      <Route exact path="/quadrant/groups/" component={GroupsList} />
      <Route path="/quadrant/groups/edit/:id" component={EditGroup} />
      <ClientAdminAuthRoute path="/quadrant/groups/add" component={GroupForm} />
      <Redirect path="*" to="/quadrant/groups" />
    </Switch>
  )
}
