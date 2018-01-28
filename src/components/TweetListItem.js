import React from 'react'
import PropTypes from 'prop-types'
import { Image, List, Icon, Label } from 'semantic-ui-react'
import styled from 'styled-components'

export default function TweetListItem(props) {
	const {tweet} = props
	const tweetLink = `https://twitter.com/twitterapi/status/${tweet.id_str}`
	const tweettext = tweet.text
	const profileImg = tweet.user.profile_image_url_https
  return (
    <List.Item as='li' style={{width: '92vw'}}>
      <List.Content>
        <List.Header>{tweettext || ''}</List.Header>
        <List.Description><Label as='a' href={`${tweetLink}`} target='_blank'> Link to tweet</Label>&nbsp;  &nbsp; posted by: <Image avatar={true} src={profileImg}/> &nbsp; {tweet.screen_name}</List.Description> 
      </List.Content>
    </List.Item>
  )
}

TweetListItem.propTypes = {
	tweet: PropTypes.object.isRequired,
}

TweetListItem.defaultProps = {}

const StyledA = styled('a')`
border-radius: 2px;
box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
transition: box-shadow 200ms cubic-bezier(0.4, 0.0, 0.2, 1);
&:hover {
  box-shadow: 0 3px 8px 0 rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08);
}
`

const StyledIcon= styled(Icon)`
padding: 6px;
`
