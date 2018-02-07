import test from 'ava'
import td from 'testdouble'
import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { Axis } from '../src/constants.js'
import SnappyScrollPaginator from '../src/SnappyScrollPaginator.js'

Enzyme.configure({ adapter: new Adapter() })

const style = {
  backgroundColor: 'red',
}

let paginatorX
let paginatorY
let onMountX
let onMountY
let onPaginateX
let onPaginateY
let children

let preventDefault
let stopPropagation

test.beforeEach(() => {
  onMountX = td.function('onMountX')
  onMountY = td.function('onMountY')
  onPaginateX = td.function('onPaginateX')
  onPaginateY = td.function('onPaginateY')
  children = <div>Children</div>

  paginatorX = mount(
    <SnappyScrollPaginator
      isEnabled
      mayPaginate
      axis={Axis.X}
      page={1}
      numPages={3}
      pageWidth={100}
      style={style}
      velocityThreshold={10}
      onMount={onMountX}
      onPaginate={onPaginateX}
    >
      {children}
    </SnappyScrollPaginator>
  )

  paginatorY = mount(
    <SnappyScrollPaginator
      isEnabled
      mayPaginate
      axis={Axis.Y}
      page={1}
      numPages={3}
      pageHeight={100}
      style={style}
      velocityThreshold={10}
      onMount={onMountY}
      onPaginate={onPaginateY}
    >
      {children}
    </SnappyScrollPaginator>
  )

  preventDefault = td.function('preventDefault')
  stopPropagation = td.function('stopPropagation')
})

test('renders its children', t => {
  t.is(paginatorX.props().children, children)
  t.is(paginatorY.props().children, children)
})

test('calls onMount() prop after storing its element reference', t => {
  t.notThrows(() => td.verify(onMountX(td.matchers.anything())))
  t.notThrows(() => td.verify(onMountY(td.matchers.anything())))
})

test('passes on the style prop to the root element', t => {
  t.is(paginatorX.props().style, style)
  t.is(paginatorY.props().style, style)
})

test('stops scroll event propagation when enabled', t => {
  const pD1 = td.function()
  const sP1 = td.function()

  paginatorX.simulate('scroll', { preventDefault: pD1, stopPropagation: sP1 })
  t.notThrows(() => td.verify(pD1()))
  t.notThrows(() => td.verify(sP1()))

  const pD2 = td.function()
  const sP2 = td.function()

  paginatorX.setProps({ isEnabled: false })
  paginatorX.simulate('scroll', { preventDefault: pD2, stopPropagation: sP2 })
  t.throws(() => td.verify(pD2()))
  t.throws(() => td.verify(sP2()))
})

test('stops wheel event propagation when enabled', t => {
  const pD1 = td.function()
  const sP1 = td.function()

  paginatorX.simulate('wheel', { preventDefault: pD1, stopPropagation: sP1 })
  t.notThrows(() => td.verify(pD1()))
  t.notThrows(() => td.verify(sP1()))

  const pD2 = td.function()
  const sP2 = td.function()

  paginatorX.setProps({ isEnabled: false })
  paginatorX.simulate('wheel', { preventDefault: pD2, stopPropagation: sP2 })
  t.throws(() => td.verify(pD2()))
  t.throws(() => td.verify(sP2()))
})

test('does not call onPaginate() when isEnabled is false', t => {
  paginatorX.setProps({ isEnabled: false })
  paginatorX.simulate('wheel', { deltaX: 100, preventDefault, stopPropagation })
  t.throws(() =>
    td.verify(onPaginateX(td.matchers.isA(Number), td.matchers.anything()))
  )
})

test('does not call onPaginate() when mayPaginate is false', t => {
  paginatorX.setProps({ mayPaginate: false })
  paginatorX.simulate('wheel', { deltaX: 100, preventDefault, stopPropagation })
  t.throws(() =>
    td.verify(onPaginateX(td.matchers.isA(Number), td.matchers.anything()))
  )
})

test('calls onPaginate prop when scroll velocity threshold is reached', t => {
  paginatorY.simulate('wheel', { deltaY: 0, preventDefault, stopPropagation })
  t.throws(() =>
    td.verify(onPaginateY(td.matchers.isA(Number), td.matchers.anything()))
  )

  paginatorY.simulate('wheel', { deltaY: 10, preventDefault, stopPropagation })
  t.notThrows(() => td.verify(onPaginateY(2, td.matchers.anything())))

  paginatorY.simulate('wheel', { deltaY: -10, preventDefault, stopPropagation })
  t.notThrows(() => td.verify(onPaginateY(0, td.matchers.anything())))
})

test('does not paginate outside range', t => {
  paginatorY
    .instance()
    .handleWheel({ deltaY: -10, preventDefault, stopPropagation })
  t.throws(() => td.verify(onPaginateY(-1)))

  paginatorY.setProps({ page: 2 })
  paginatorY
    .instance()
    .handleWheel({ deltaY: 10, preventDefault, stopPropagation })
  t.throws(() => td.verify(onPaginateY(3)))
})
