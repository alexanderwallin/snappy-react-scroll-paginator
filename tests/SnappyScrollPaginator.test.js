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
let onPaginateX
let onPaginateY
let children

let preventDefault
let stopPropagation

test.beforeEach(() => {
  onPaginateX = td.function('onPaginateX')
  onPaginateY = td.function('onPaginateY')
  children = <div>Children</div>

  paginatorX = mount(
    <SnappyScrollPaginator
      axis={Axis.X}
      page={1}
      numPages={3}
      pageWidth={100}
      style={style}
      velocityThreshold={10}
      onPaginate={onPaginateX}
    >
      {children}
    </SnappyScrollPaginator>
  )

  paginatorY = mount(
    <SnappyScrollPaginator
      axis={Axis.Y}
      page={1}
      numPages={3}
      pageHeight={100}
      style={style}
      velocityThreshold={10}
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

test('passes on the style prop to the root element', t => {
  t.is(paginatorX.props().style, style)
  t.is(paginatorY.props().style, style)
})

test('stops scroll event propagation', t => {
  paginatorX.simulate('scroll', { preventDefault, stopPropagation })
  t.notThrows(() => td.verify(preventDefault()))
  t.notThrows(() => td.verify(stopPropagation()))
})

test('stops wheel event propagation', t => {
  paginatorX.simulate('wheel', { preventDefault, stopPropagation })
  t.notThrows(() => td.verify(preventDefault()))
  t.notThrows(() => td.verify(stopPropagation()))
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
