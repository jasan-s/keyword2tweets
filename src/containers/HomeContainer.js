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
    setKewordsListener: PropTypes.func.isRequired,
    tweetsData: PropTypes.object,
    currentKeyword: PropTypes.string,
    keywords: PropTypes.object,
    keywordIdList: PropTypes.array,
    fetching: PropTypes.bool.isRequired,
  }
  static defaultProps = {}
  constructor(props) {
    super(props)
    this.state = {userEnteredKeyword: ''}
  }

  componentDidMount() {
    this.props.setKewordsListener()
  }

  handleInputChange = (e, { value }) => {
    this.setState({userEnteredKeyword: value})
  }

  handleSearchSubmit = async () => {
    await this.props.handlefetchingTweetsGivenKeyword(this.state.userEnteredKeyword)
    this.setState({userEnteredKeyword: ''})
  }

  handleRecentKeywordClick = async (e, { value }) => {
    await this.props.handlefetchingTweetsGivenKeyword(value, true)
    this.setState({userEnteredKeyword: ''})
  }

  render() {
    const {tweetsData, currentKeyword, fetching, keywords, keywordIdList, error } = this.props
    return (
      <div>
        <Home
        handleSearchSubmit={this.handleSearchSubmit}
        handleInputChange={this.handleInputChange}
        userEnteredKeyword={this.state.userEnteredKeyword}
        tweetsData={tweetsData}
        currentKeyword= {currentKeyword}
        fetching={fetching}
        keywords={keywords}
        keywordIdList={keywordIdList}
        handleRecentKeywordClick={this.handleRecentKeywordClick}
        error={error}/>
      </div>
    )
  }
}




function mapStateToProps ({main}, props) {
  const {fetching, error, tweetsData, currentKeyword, keywords, keywordIdList} = main
  return {
    fetching,
    error,
    tweetsData,
    currentKeyword,
    keywords,
    keywordIdList,
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators(MainActionCreators, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeContainer))

