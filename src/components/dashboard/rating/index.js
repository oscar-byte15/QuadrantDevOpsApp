import React, { lazy } from 'react'
import { useDispatch } from 'react-redux'
import {
  cleanFilterVisibility,
  filterInValoration,
  filterInReport
} from 'redux/actions/filter/actionDispatcher'
const List = lazy(() => import(/*webpackChunkName: "List-products"*/ './list'))

const Surveys = () => {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(filterInValoration())
    return () => dispatch(cleanFilterVisibility())
    //eslint-disable-next-line
  }, [])

  document.title = 'Rating y Productos - Quadrant Dashboard'
  return <List />
}

//<Route path="/quadrat/rating/editProduct" component={Edit} />
//<Route path="/quadrant/rating/addProduct" component={Add} />
export default Surveys
