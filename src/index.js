import React from 'react'
import { hydrate, render} from 'react-dom'
import App from './App.js'
import registerServiceWorker from './registerServiceWorker'
import {configureStore, history} from './redux/store'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'react-router-redux'

async function init() {

	const store = await configureStore()
	const rootElement = document.getElementById('root')
	const element = <Provider store={store}>
	<ConnectedRouter history={history}>
		<App />
	</ConnectedRouter>
	</Provider>

	if (rootElement.hasChildNodes()) {
	  hydrate(element, rootElement)
	} else {
	  render(element, rootElement)
	}
}
init()

registerServiceWorker()