import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Home from 'components/Home'

export default class HomeContainer extends Component {

  static propTypes = {}
  static defaultProps = {}
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <Home />
      </div>
    )
  }
}
