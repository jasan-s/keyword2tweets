import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Home from 'components/Home'

export default class HomeContainer extends Component {

  static propTypes = {}
  static defaultProps = {}
  constructor(props) {
    super(props)
    this.state = {userEnteredKeyword: ''}
  }

   handleInputChange = (e, { value }) => {
    this.setState({userEnteredKeyword: value})
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
