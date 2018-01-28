import React from 'react'
import {Helmet} from 'react-helmet'
import styled from 'styled-components'
import {NavLink} from 'react-router-dom'
import { Header, Icon } from 'semantic-ui-react'


export default function Error404(props) {
  return (
    <Div>
    <Helmet
       title= {`${process.env.REACT_APP_APP_NAME} | 404`} /> 
     <Header as='h2' icon={true}>
			<Icon name='frown' />
				404
			<Header.Subheader>
				What exactly are you looking for
			</Header.Subheader>
		</Header>
   <br />
   <StyledNavLink to='/'> BACK TO HOME</StyledNavLink>
    </Div>
  )
}

Error404.propTypes = {}
Error404.defaultProps = {}

const Div = styled('div')`
    	display: flex;
    	flex-direction: column;
    	justify-content: center;
    	align-items: center;
    	min-height: 92vh;
    	text-align: center;
`

const StyledNavLink = styled(NavLink).attrs({
})`
  text-decoration: none;
  &.navItemActive {
    font-weight: bold;
  }`