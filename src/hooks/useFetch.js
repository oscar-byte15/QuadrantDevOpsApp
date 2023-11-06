import { useEffect, useReducer } from 'react'
import httpModule from 'services/httpModule'

const initialState = {
  loading: true,
  error: null,
  data: null
}

/*
const getQueryString = (params) => params? Object.keys(params).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
}).join('&') : '';
*/

export default function useFetch(url) {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'FETCHING':
        return { ...state, error: null, loading: true }
      case 'FETCHED':
        return { data: action.payload, error: null, loading: false }
      case 'FETCH_ERROR':
        return { data: null, error: action.payload, loading: false }
      default:
        return state
    }
  }, initialState)

  useEffect(() => {
    let cancelRequest = false
    if (!url || !url.trim()) return
    ;(async function () {
      dispatch({ type: 'FETCHING' })
      try {
        const response = await httpModule.get(url)
        if (cancelRequest) return
        dispatch({ type: 'FETCHED', payload: response.data })
      } catch (error) {
        if (cancelRequest) return
        dispatch({ type: 'FETCH_ERROR', payload: error })
      }
    })()

    return () => (cancelRequest = true)
  }, [url])

  return state
}
