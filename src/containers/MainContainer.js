import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dimmer, Loader} from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ActionCreators from 'redux/modules/main'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

class MainContainer extends Component {
  static propTypes = {
    children: PropTypes.array.isRequired,
  }
  static defaultProps = {
    children: null,
  }
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div>
      {this.props.fetching
        ? <StyledLoader active size='massive'></StyledLoader>
        : null }
        {this.props.children}
      </div>
    )
  }
}


function mapStateToProps ({main}, props) {
  const {fetching} = main
  return {
    fetching,
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainContainer))

const StyledLoader = styled(Loader)`
  width: 100%
  height: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 999;
`