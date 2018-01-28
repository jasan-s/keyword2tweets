import React from 'react'
import PropTypes from 'prop-types'
import {Helmet} from 'react-helmet'
import { Input, Image, List, Label } from 'semantic-ui-react'
import styled from 'styled-components'
import logo from 'media/logo.png'
import TweetListItem from 'components/TweetListItem'
import RecentlySearchedKeywordItem from 'components/RecentlySearchedKeywordItem'


export default function Home(props) {
  const {userEnteredKeyword, handleInputChange, handleSearchSubmit, tweetsData, currentKeyword, fetching, keywords, keywordIdList, error} = props
  let emptyTweetArray = false
  let currentKeywordTweets = []
  if (tweetsData[currentKeyword] !== undefined) {
    if (tweetsData[currentKeyword].length === 0) {
      emptyTweetArray = true
    } else {
      currentKeywordTweets = tweetsData[currentKeyword]
    }
 }

  return (
    <div>
        <Helmet>
          <title> {process.env.REACT_APP_APP_NAME}</title>
          <meta name='og:url' content='https://Keyword2Tweets.firebaseapp.com'/>
          <meta name='og:type' content='website'/>
          <meta name='og:site_name' content='Keyword2Tweets'/>
          <meta name='og:title' content='Keyword2Tweets – Given a keyword, retrieves 10 most recent tweets from twitter.'/>
          <meta name='og:description' content='The App allows user to enter in a keyword retrieve 10 most recent tweets(using Twitter API) if they exist.'/>

          <meta name='twitter:card' content='summary'/>
          <meta name='twitter:title' content='Keyword2Tweets – Given a keyword, retrieves 10 most recet tweets from twitter.'/>
          <meta name='twitter:description' content='The App allows user to enter in a keyword retrieve 10 most recent tweets(using Twitter API) if they exist.'/>
      </Helmet>
      <Logo><Image src={logo} alt='bird tweeting'/> </Logo>
      <StyledSearchDiv>
        <StyledLargeHeader>Keyword2Tweets</StyledLargeHeader>
        <StyledSubHeader>Enter keyword to see the most recent tweets matching the keyword</StyledSubHeader>
        <StyledInput disabled= {fetching} className='search-box' value= {userEnteredKeyword}
        onChange={handleInputChange} placeholder='Keyword...' />
        <Button disabled= {fetching || userEnteredKeyword === '' || userEnteredKeyword === undefined} onClick={handleSearchSubmit} >Search</Button>
        </StyledSearchDiv>

        <KeywordsHeading>&darr; &nbsp; recently searched keywords &nbsp; &darr;</KeywordsHeading>
        <KeywordsDiv>
        {keywordIdList.length > 0 && Object.keys(keywords).length > 0
           ? <List horizontal>
            {keywordIdList.map((keywordId, index) => (
            <RecentlySearchedKeywordItem
            keywordId={keywordId}
            key={keywordId}
            index={index}
            {...props}/>
            ))
            }
          </List>
           : null}
        </KeywordsDiv>
       {error
        ?<EmptyMessage> {error}</EmptyMessage>
        :null}
        <TweetList>
        {currentKeywordTweets.length > 0
           ? <div>
           <ListHeading >Recent Tweets Matching: &nbsp; {currentKeyword} </ListHeading>
           <List celled={true}>
            {currentKeywordTweets.map((tweet, index) => (
            <TweetListItem
            tweet={tweet}
            key={tweet.id}
            index={index}
            {...props}/>
            ))
            }
          </List>
          </div>
           : null}
          {emptyTweetArray === true && currentKeywordTweets.length === 0
            ? <EmptyMessage>There does not seem to be any recent tweets for the word {currentKeyword}.</EmptyMessage>
            :null}
        </TweetList>
    </div>
  )
}

Home.propTypes = {
  userEnteredKeyword: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSearchSubmit: PropTypes.func.isRequired,
  currentKeywordTweets: PropTypes.array,
  tweetsData: PropTypes.object,
  currentKeyword: PropTypes.string,
  fetching: PropTypes.bool.isRequired,
  keywordIdList: PropTypes.array,
}

Home.defaultProps = {
  userEnteredKeyword: '',
}


const StyledSearchDiv = styled('div')`
  margin-top: 12vh;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;

`
const Logo = styled('div')`
  margin-top: 2vh;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`

const StyledInput = styled(Input)`
  width: 320px;
  max-width: 92vw;
  margin-bottom: 2vh;
  border-radius: 2px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
  transition: box-shadow 200ms cubic-bezier(0.4, 0.0, 0.2, 1);
  &:hover {
    box-shadow: 0 3px 8px 0 rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08);
  }
`

const Button = styled.button`
  border-radius: 3px;
  background: white;
  color: grey;
  padding: 0.5em 0.5em;
  width: 136px;
  border: 1px solid grey;
  cursor: pointer;
  &:hover {
  border: 1px solid grey;
  background: grey;
  color: white;}
`


const StyledLargeHeader = styled('div')`
  font-size: 2em;
  font-weight: 800;
  margin-bottom: 2vh;
`

const StyledSubHeader = styled('div')`
  font-size: 1.2em;
  font-weight: 500;
  margin-bottom: 5vh;
  @media (max-width:420px) {
   font-size: 0.86em;
  } 

`

const TweetList = styled('div')`
  margin-top: 5vh;
  margin-bottom: 5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const EmptyMessage = styled('div')`
  display: flex;
  text-align: center;
  justify-content: center;
  padding-left: 2vw;
  padding-right: 2vw;
  color: tomato;
`
const KeywordsHeading = styled('div')`
  display: flex;
  margin-bottom: 2vh;
  margin-top: 2vh; 
  text-align: center;
  flex-direction: row;
  justify-content: center;
  padding-left: 2vw;
  padding-right: 2vw;
`
const KeywordsDiv = styled('div')`
  display: flex;
  margin-bottom: 2vh;
  margin-top: 2vh; 
  text-align: center;
  flex-direction: row;
  justify-content: center;
  padding-left: 2vw;
  padding-right: 2vw;
`

const ListHeading = styled('div')`
  margin-bottom: 2vh;
  width:100%;
  margin-top: 2vh; 
  font-size: 1.6em;
  text-align: center;
  background: #0490e3;
  color: white;
  padding: 12px 12px;
  border-radius: 4px;
  @media (max-width:420px) {
   font-size: 0.86em;
  } 
`