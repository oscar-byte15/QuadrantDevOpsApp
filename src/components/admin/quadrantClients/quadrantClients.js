import React from 'react'
import { Switch, Route } from 'react-router-dom'
import List from './list'

export default function QuadrantClients() {
  return (
    <Switch>
      <Route path="/admin/clients" component={List} />
    </Switch>
  )
}
