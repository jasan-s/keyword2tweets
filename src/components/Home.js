import React from 'react'
import PropTypes from 'prop-types'
import {Helmet} from 'react-helmet'
import { Input } from 'semantic-ui-react'
import styled from 'styled-components'

export default function Home(props) {
  const {userEnteredKeyword, handleInputChange, handleSearchSubmit} = props
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
      <StyledSearchDiv>
        <StyledLargeHeader>Keyword2Tweets</StyledLargeHeader>
        <StyledSubHeader>Enter keyword to see the most recent tweets matching the keyword</StyledSubHeader>
        <StyledInput className='search-box' value= {userEnteredKeyword}
        onChange={handleInputChange} placeholder='Keyword...' />
        <Button onClick={handleSearchSubmit} >Search</Button>
        </StyledSearchDiv>

    </div>
  )
}

Home.propTypes = {
  userEnteredKeyword: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSearchSubmit: PropTypes.func.isRequired,
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
  border: 2px solid grey;
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