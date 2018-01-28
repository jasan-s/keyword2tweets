import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Home from 'components/Home'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as MainActionCreators from 'redux/modules/main'
import { withRouter } from 'react-router-dom'

class HomeContainer extends Component {

  static propTypes = {
    handlefetchingTweetsGivenKeyword: PropTypes.func.isRequired,
  }
  static defaultProps = {}
  constructor(props) {
    super(props)
    this.state = {userEnteredKeyword: ''}
  }

  handleInputChange = (e, { value }) => {
    this.setState({userEnteredKeyword: value})
  }

  handleSearchSubmit = async () => {
    await this.props.handlefetchingTweetsGivenKeyword(this.state.userEnteredKeyword)
    this.setState({userEnteredKeyword: ''})
  }

  render() {
    return (
      <div>
        <Home
        handleSearchSubmit={this.handleSearchSubmit}
        handleInputChange={this.handleInputChange}
        userEnteredKeyword={this.state.userEnteredKeyword}
        currentKeyword={this.state.currentKeyword}
        tweetsData={this.props.tweetsData}
        currentKeyword= {this.props.currentKeyword}
        />
      </div>
    )
  }
}




function mapStateToProps ({main}, props) {
  const {fetching, error, tweetsData, currentKeyword} = main
  return {
    fetching,
    error,
    tweetsData,
    currentKeyword,
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators(MainActionCreators, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeContainer))

