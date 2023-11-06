import React, { lazy } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { changeFilterOptions, cleanFilterVisibility, filterInReport } from 'redux/actions/filter/actionDispatcher'

const QuadrantReport = lazy(() => import(/*webpackChunkName: "csatReport"*/ './quadrantReport'))
const PinkberryReport = lazy(()=> import(/*webpackChunkName: "csatReport"*/ './pinkberryReport'))

export default function Reports() {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(
      changeFilterOptions({ shouldShow: true, canFilterByDateRange: true})
    )
    return () => dispatch(changeFilterOptions({ shouldShow: false, canFilterByDateRange: false }))
  }, [dispatch])

  const user = JSON.parse(sessionStorage.session)
  
  const verifyUser = user.quadrantClient.id == "6345d490fcf7ad2a6c2e61ca";
  
  return (
    <Switch>
      <Route path="/quadrant/surveyReport/quadrantReport" component={QuadrantReport} />
      {
        verifyUser ?
       <Route path="/quadrant/surveyReport/pinkberryReport" component={PinkberryReport}  /> : <> </>}
    </Switch>
  )
}
