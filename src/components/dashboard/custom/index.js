import React, { lazy } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { changeFilterOptions } from 'redux/actions/filter/actionDispatcher'

const ReporteDerco = lazy(() => import(/*webpackChunkName: "derco"*/ './reporteDerco'))
const NpsByExecutive = lazy(() => import(/*webpackChunkName: "npsExec"*/ './npsByExecutive'))
const ReportByMarca = lazy(() => import(/*webpackChunkName: "reporteMarca"*/ './reportByMarca'))
const ReportBySurcursal = lazy(() => import(/*webpackChunkName: "sucursal"*/ './reportBySucursal'))
const ReportByGroup = lazy(() => import(/*webpackChunkName: "gruporep"*/ './reporteGrupo'))

export default function Reports() {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(
      changeFilterOptions({ shouldShow: true, canFilterByDateRange: true, canFilterByGroup: true })
    )
    return () => dispatch(changeFilterOptions({ shouldShow: false, canFilterByDateRange: false }))
  }, [dispatch])

  return (
    <Switch>
      <Route path="/quadrant/custom/reporteSucursal" component={ReportBySurcursal} />
      <Route path="/quadrant/custom/reporteDerco" component={ReporteDerco} />
      <Route path="/quadrant/custom/npsEjecutivo" component={NpsByExecutive} />
      <Route path="/quadrant/custom/reporteMarca" component={ReportByMarca} />
      <Route path="/quadrant/custom/:slug" component={ReportByGroup} />
    </Switch>
  )
}
