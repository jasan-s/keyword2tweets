import React, { Component } from 'react'
import PropTypes from 'prop-types'
export default class MainContainer extends Component {
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
        {this.props.children}
      </div>
    )
  }
}
