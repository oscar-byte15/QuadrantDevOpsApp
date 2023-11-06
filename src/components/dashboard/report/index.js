import React, { lazy } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { cleanFilterVisibility, filterInReport } from 'redux/actions/filter/actionDispatcher'

const CsatReport = lazy(() => import(/*webpackChunkName: "csatReport"*/ './csatReport'))
const NpsReport = lazy(() => import(/*webpackChunkName: "npsReport"*/ './npsReport'))

export default function Reports() {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(filterInReport())
    return () => dispatch(cleanFilterVisibility())
    //eslint-disable-next-line
  }, [])
  return (
    <Switch>
      <Route path="/quadrant/report/csatreport" component={CsatReport} />
      <Route path="/quadrant/report/npsreport" component={NpsReport} />

    </Switch>
  )
}
