import React, { useEffect } from 'react'
import MENU_OPTIONS from '../../menu/menuSections'
import { Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { selectOption } from '../../../redux/actions/menu/actionDispatcher'
import { ClientAdminAuthRoute } from '../../routes/authRoutes'
import Account from './account'
import Notifications from './notifications'
import Settings from './settings'

export default function SettingsIndex() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(selectOption(MENU_OPTIONS.SETTINGS.id))
  }, [dispatch])

  return (
    <Switch>
      <Route exact path="/quadrant/settings/account" component={Account} />
      <ClientAdminAuthRoute path="/quadrant/settings/users" component={Settings} />
      <ClientAdminAuthRoute path="/quadrant/settings/notifications" component={Notifications} />
    </Switch>
  )
}
