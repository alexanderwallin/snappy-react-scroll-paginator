/* eslint react/prop-types: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */
/* global window */
import test from 'ava'
import td from 'testdouble'
import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { Axis } from '../src/constants.js'
import withScrollTo from '../src/withScrollTo.js'

Enzyme.configure({ adapter: new Adapter() })

test(`scrolls the element passed to onPaginate() using the provided scrollTo prop function`, t => {
  const $el = {}
  const scrollTo = td.function('scrollTo')

  const ClickToPaginate = ({ onPaginate }) => (
    <div onClick={() => onPaginate(1, $el)} />
  )
  const ScrollingChild = withScrollTo(ClickToPaginate)

  const compX = mount(
    <ScrollingChild
      axis={Axis.X}
      initialPage={0}
      pageSize={100}
      scrollDuration={10}
      scrollTo={scrollTo}
    />
  )
  compX.find(ClickToPaginate).simulate('click')
  t.notThrows(() =>
    td.verify(scrollTo($el, Axis.X, 100, 10, td.matchers.isA(Function)))
  )

  const compY = mount(
    <ScrollingChild
      axis={Axis.Y}
      initialPage={0}
      pageSize={100}
      scrollDuration={10}
      scrollTo={scrollTo}
    />
  )
  compY.find(ClickToPaginate).simulate('click')
  t.notThrows(() =>
    td.verify(scrollTo($el, Axis.Y, 100, 10, td.matchers.isA(Function)))
  )
})

test(`pauses pagination for as long as the scrollPause prop defines`, t => {
  const $el = {}
  const scrollTo = td.function('scrollTo')
  const windowSetTimeout = td.replace(window, 'setTimeout')
  let timeoutFn

  // Stub scroll.top to simply invoke the callback
  td
    .when(
      scrollTo(
        td.matchers.anything(),
        td.matchers.isA(String),
        td.matchers.isA(Number),
        td.matchers.isA(Number),
        td.matchers.isA(Function)
      )
    )
    .thenDo(($elem, axis, offset, duration, cb) => {
      cb()
    })

  // Store a reference to the function that triggers the state change,
  // so that we can call it later to very the update
  td
    .when(windowSetTimeout(td.matchers.isA(Function), td.matchers.isA(Number)))
    .thenDo(fn => {
      timeoutFn = fn
    })

  const ClickToPaginate = ({ onPaginate }) => (
    <div onClick={() => onPaginate(1, $el)} />
  )
  const ScrollingChild = withScrollTo(ClickToPaginate)

  const comp = mount(
    <ScrollingChild
      axis={Axis.Y}
      initialPage={0}
      pageSize={100}
      scrollPause={50}
      scrollTo={scrollTo}
    />
  )
  comp.find(ClickToPaginate).simulate('click')
  t.notThrows(() => td.verify(windowSetTimeout(td.matchers.isA(Function), 50)))

  t.is(comp.state().isScrolling, true)
  timeoutFn()
  t.is(comp.state().isScrolling, false)
})
