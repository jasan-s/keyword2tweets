import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Home from 'components/Home'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ActionCreators from 'redux/modules/main'
import { withRouter } from 'react-router-dom'

class HomeContainer extends Component {

  static propTypes = {}
  static defaultProps = {}
  constructor(props) {
    super(props)
    this.state = {userEnteredKeyword: ''}
  }

  handleInputChange = (e, { value }) => {
    this.setState({userEnteredKeyword: value})
  }

  componentDidMount() {
    this.props.handlefetchingTweetsGivenKeyword('nfl')
  }

  render() {
    return (
      <div>
        <Home
        handleInputChange={this.handleInputChange}
        userEnteredKeyword={this.state.userEnteredKeyword}/>
      </div>
    )
  }
}




function mapStateToProps (state, props) {
  return {
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeContainer))

