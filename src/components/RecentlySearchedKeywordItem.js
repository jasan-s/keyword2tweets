import React from 'react'
import PropTypes from 'prop-types'
import { Label, List } from 'semantic-ui-react'
import styled from 'styled-components'

export default function RecentlySearchedKeywordItem(props) {
	const {keywordId, keywords, handleRecentKeywordClick, fetching} = props
	let keyword = null
	if(keywords[keywordId] !== undefined) {
		keyword = keywords[keywordId].keyword
	}
  return (
		keyword
		? <List.Item disabled={fetching} >
      <StyledLabel value={keyword} onClick={handleRecentKeywordClick}>{keyword}</StyledLabel>
    </List.Item>
    : null
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
