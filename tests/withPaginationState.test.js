/* eslint react/prop-types: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */
import test from 'ava'
import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import withPaginationState from '../src/withPaginationState.js'

Enzyme.configure({ adapter: new Adapter() })

const Child = ({ children }) => <div>{children}</div>

test(`takes an initialPage prop that is stored in the wrapper's state and passed on as a prop`, t => {
  const ScrollingChild = withPaginationState(Child)
  const comp = mount(<ScrollingChild initialPage={1} />)

  t.is(comp.state().page, 1)
  t.is(comp.find(Child).props().page, 1)
})

test(`updates page state when onPaginate is called`, t => {
  const $el = {}
  const ClickToPaginate = ({ onPaginate }) => (
    <div onClick={() => onPaginate(2, $el)} />
  )
  const ScrollingChild = withPaginationState(ClickToPaginate)
  const comp = mount(<ScrollingChild initialPage={1} />)
  t.is(comp.state().page, 1)

  comp.find(ClickToPaginate).simulate('click')
  t.is(comp.state().page, 2)
})
