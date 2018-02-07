/* eslint react/prop-types: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */
import test from 'ava'
import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { Axis } from '../src/constants.js'
import withScrollTo from '../src/withScrollTo.js'

Enzyme.configure({ adapter: new Adapter() })

const Child = ({ children }) => <div>{children}</div>

test(`takes an initialPage prop that is stored in the wrapper's state and passed on as a prop`, t => {
  const ScrollingChild = withScrollTo(Child)
  const comp = mount(<ScrollingChild initialPage={1} />)

  t.is(comp.state().page, 1)
  t.is(comp.find(Child).props().page, 1)
})

test(`updates page state when onPaginate is called`, t => {
  const ClickToPaginate = ({ onPaginate }) => (
    <div onClick={() => onPaginate(2)} />
  )
  const ScrollingChild = withScrollTo(ClickToPaginate)
  const comp = mount(<ScrollingChild initialPage={1} />)
  t.is(comp.state().page, 1)

  comp.find(ClickToPaginate).simulate('click')
  t.is(comp.state().page, 2)
})

test(`sets scrollLeft/scrollTop on the element passed to onPaginate()`, t => {
  const $el = { scrollLeft: 0, scrollTop: 0 }
  const ClickToPaginate = ({ onPaginate }) => (
    <div onClick={() => onPaginate(1, $el)} />
  )
  const ScrollingChild = withScrollTo(ClickToPaginate)

  const compX = mount(
    <ScrollingChild axis={Axis.X} initialPage={0} pageWidth={100} />
  )
  compX.find(ClickToPaginate).simulate('click')
  t.is($el.scrollLeft, 100)

  const compY = mount(
    <ScrollingChild axis={Axis.Y} initialPage={0} pageHeight={100} />
  )
  compY.find(ClickToPaginate).simulate('click')
  t.is($el.scrollTop, 100)
})
