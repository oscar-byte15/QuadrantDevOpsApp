import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectOption } from '../../redux/actions/menu/actionDispatcher'
import MENU_OPTIONS from '../menu/menuSections'

class Knowledge extends Component {
  componentDidMount() {
    this.props.selectOption(MENU_OPTIONS.KOWLEDGE.id)
  }

  render() {
    return (
      <iframe
        title="slite"
        className="knowledge"
        src="https://grouly.slite.com/api/s/channel/Rpoc15crsbB321sP44wqjo/Clientes%20Quadrant"
      />
    )
  }
}

export default connect(null, { selectOption })(Knowledge)
