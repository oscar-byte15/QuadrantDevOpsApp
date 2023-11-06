import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggle } from '../../redux/actions/menu/actionDispatcher'
import { ReactComponent as QuadrantIcon } from '../../assets/images/quadrant/quadrant-icon.svg'
import { ReactComponent as QuadrantLogo } from '../../assets/images/quadrant/quadrant-logo.svg'

class MainButton extends Component {
  constructor(props) {
    super(props)
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  render() {
    return (
      <div className="btn-menu-toggle" onClick={this.toggleMenu}>
        {this.props.menu.isMobile || this.props.menu.open ? (
          <QuadrantLogo className="quadrant-logo" height="100%" />
        ) : (
          <QuadrantIcon className="quadrant-icon" height="100%" />
        )}
      </div>
    )
  }

  toggleMenu() {
    this.props.toggle()
  }
}

const mapStateToProps = state => {
  return {
    menu: state.menu,
    isMobile: state.app.isMobile
  }
}

export default connect(mapStateToProps, { toggle })(MainButton)
