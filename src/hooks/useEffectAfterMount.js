import React from 'react'

const useEffectAfterMount = (cb, deps) => {
  const isMounted = React.useRef(false)
  React.useEffect(() => {
    if (!Array.isArray(deps)) throw Error('deps must be an array')
    if (isMounted.current) cb()
    else isMounted.current = true
    //eslint-disable-next-line
  }, deps)
}

export default useEffectAfterMount
