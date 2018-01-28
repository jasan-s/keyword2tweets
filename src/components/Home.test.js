import React from 'react'
import { shallow, mount } from 'enzyme'
import Home from './Home'

describe('Home', () => {
	const home = shallow(<Home />)
	it('renders properly', () => {
		expect(home).toMatchSnapshot()
	})
	it('renders a searchbox', () => {
		expect(home.find('.search-box').exists()).toBe(true)
	})
})

describe('When user types in the searchbox', () => {
  const props = {userEnteredKeyword: 'nfl' , handleInputChange: jest.fn()}

  const home = mount(<Home {...props} />)

  const searchBox = home.find('.search-box')
  searchBox.value = 'nfl'
  expect(home.props().userEnteredKeyword).toBe(props.userEnteredKeyword)
})
