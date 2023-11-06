import React from 'react'
import { Switch, Route } from 'react-router-dom'
import List from './list'

export default function Users() {
  return (
    <Switch>
      <Route path="/admin/users" component={List} />
    </Switch>
  )
}
