import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import {Helmet} from 'react-helmet'
import { AnimatedSwitch } from 'react-router-transition/lib/react-router-transition'
import './App.css'
import MainContainer from 'containers/MainContainer.js'
import HomeContainer from 'containers/HomeContainer.js'
import Error404 from 'components/Error404.js'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
    <MainContainer>
        <Helmet
          title= {process.env.REACT_APP_APP_NAME}
          style={[
          ]}/>
        <AnimatedSwitch
          atEnter={{opacity: 0}}
          atLeave={{opacity: 0}}
          atActive={{opacity: 1}}
          className='switch-wrapper'>
          <Route exact={true} path='/' component={HomeContainer} />
          <Route component={Error404} />
        </AnimatedSwitch>
    </MainContainer>
    )
  }
}

