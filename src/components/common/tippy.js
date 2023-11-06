import React from 'react'
import PropTypes from 'prop-types'
import { default as TippyJs } from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-toward-subtle.css'

const Tippy = ({ ...rest }) => <TippyJs {...rest} />

export default Tippy

Tippy.propTypes = {
  content: PropTypes.string.isRequired
}

Tippy.defaultProps = {
  placement: 'bottom',
  animation: 'shift-toward-subtle'
}
