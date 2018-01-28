import React from 'react'
import PropTypes from 'prop-types'
import {Helmet} from 'react-helmet'
import { Input } from 'semantic-ui-react'

export default function Home(props) {
  const {userEnteredKeyword, handleInputChange} = props
  return (
    <div>
        <Helmet>
          <title> {process.env.REACT_APP_APP_NAME}</title>
          <meta name='og:url' content='https://Keyword2Tweets.firebaseapp.com'/>
          <meta name='og:type' content='website'/>
          <meta name='og:site_name' content='Keyword2Tweets'/>
          <meta name='og:title' content='Keyword2Tweets – Given a keyword, retrieves 10 most recet tweets from twitter.'/>
          <meta name='og:description' content='The App allows user to enter in a keyword retrieve 10 most recent tweets(using Twitter API) if they exist.'/>

          <meta name='twitter:card' content='summary'/>
          <meta name='twitter:title' content='Keyword2Tweets – Given a keyword, retrieves 10 most recet tweets from twitter.'/>
          <meta name='twitter:description' content='The App allows user to enter in a keyword retrieve 10 most recent tweets(using Twitter API) if they exist.'/>
      </Helmet>
        <Input className='search-box' value= {userEnteredKeyword} icon='search'
        onChange={handleInputChange} placeholder='Enter Keyword...' />

    </div>
  )
}

Home.propTypes = {
  userEnteredKeyword: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
}

Home.defaultProps = {
  userEnteredKeyword: '',
}
