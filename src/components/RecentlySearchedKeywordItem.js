import React from 'react'
import PropTypes from 'prop-types'
import { Label, List } from 'semantic-ui-react'
import styled from 'styled-components'

export default function RecentlySearchedKeywordItem(props) {
	const {keywordId, keywords, handleRecentKeywordClick} = props
  return (
    <List.Item>
      <StyledLabel value={keywords[keywordId].keyword} onClick={handleRecentKeywordClick}>{keywords[keywordId].keyword}</StyledLabel>
    </List.Item>
  )
}

RecentlySearchedKeywordItem.propTypes = {
	keywordId: PropTypes.string.isRequired,
	handleRecentKeywordClick: PropTypes.func.isRequired,
	keywords: PropTypes.object.isRequired,
}

RecentlySearchedKeywordItem.defaultProps = {}

const StyledLabel = styled(Label)`
  cursor: pointer;
  &:hover {
  background: grey;
  color: white;}
`
