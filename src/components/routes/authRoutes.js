import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { store } from '../../redux/store'

export const NotAuthRoute = ({ component: Component, ...rest }) => {
  let state = store.getState()
  return (
    <Route
      {...rest}
      render={props => {
        if (state.auth)
          if (state.auth.isSuperAdmin) return <Redirect to="/admin/users" />
          else return <Redirect to="/quadrant/home" />
        else return <Component {...props} />
      }}
    />
  )
}

export const AuthRoute = ({ component: Component, ...rest }) => {
  let state = store.getState()
  return (
    <Route
      {...rest}
      render={props => {
        if (state.auth) return <Component {...props} />
        else return <Redirect to="/" />
      }}
    />
  )
}

export const AdminAuthRoute = ({ component: Component, ...rest }) => {
  let state = store.getState()
  return (
    <Route
      {...rest}
      render={props => {
        if (state.auth && state.auth.isSuperAdmin) return <Component {...props} />
        else return <Redirect to="/" />
      }}
    />
  )
}

export const ClientAdminAuthRoute = ({ component: Component, ...rest }) => {
  let state = store.getState()
  return (
    <Route
      {...rest}
      render={props => {
        if (state.auth && state.auth.roles.includes('ADMIN')) return <Component {...props} />
        else return <Redirect to="/quadrant/home" />
      }}
    />
  )
}
