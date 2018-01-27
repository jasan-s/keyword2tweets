import React from 'react'
import PropTypes from 'prop-types'
import {Helmet} from 'react-helmet'

export default function Home(props) {
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
      Home
    </div>
  )
}

Home.propTypes = {}

Home.defaultProps = {}
