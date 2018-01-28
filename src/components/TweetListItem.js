import React from 'react'
import PropTypes from 'prop-types'
import { Image, List, Label } from 'semantic-ui-react'

export default function TweetListItem(props) {
	const {tweet, index} = props
	const tweetLink = `https://twitter.com/twitterapi/status/${tweet.id_str}`
	const tweettext = tweet.text
	const profileImg = tweet.user.profile_image_url_https
  return (
    <List.Item style={{width: '92vw'}}>
      <List.Content>
        <List.Header>{index+1}:&nbsp;  {tweettext || ''}</List.Header>
        <List.Description><Label as='a' href={`${tweetLink}`} target='_blank'> Link to tweet</Label>&nbsp;  &nbsp; posted by: <Image avatar={true} src={profileImg}/> &nbsp; {tweet.screen_name}</List.Description> 
      </List.Content>
    </List.Item>
  )
}

TweetListItem.propTypes = {
	tweet: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
}

TweetListItem.defaultProps = {}
