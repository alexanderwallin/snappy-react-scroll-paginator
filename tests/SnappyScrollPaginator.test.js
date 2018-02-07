import test from 'ava'
import td from 'testdouble'
import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import SnappyScrollPaginator from '../src/SnappyScrollPaginator.js'

Enzyme.configure({ adapter: new Adapter() })

let paginatorX
let paginatorY
let onPaginateX
let onPaginateY
let children

test.beforeEach(() => {
  onPaginateX = td.function('onPaginateX')
  onPaginateY = td.function('onPaginateY')
  children = <div>Children</div>

  paginatorX = mount(
    <SnappyScrollPaginator
      axis={SnappyScrollPaginator.Axis.X}
      page={1}
      numPages={3}
      pageWidth={100}
      velocityThreshold={10}
      onPaginate={onPaginateX}
    >
      {children}
    </SnappyScrollPaginator>
  )

  paginatorY = mount(
    <SnappyScrollPaginator
      axis={SnappyScrollPaginator.Axis.Y}
      page={1}
      numPages={3}
      pageHeight={100}
      velocityThreshold={10}
      onPaginate={onPaginateY}
    >
      {children}
    </SnappyScrollPaginator>
  )
})

test('renders its children', t => {
  t.is(paginatorX.props().children, children)
  t.is(paginatorY.props().children, children)
})

test('has correct initial scroll position', t => {
  t.is(paginatorX.instance().$el.scrollLeft, 100)
  t.is(paginatorY.instance().$el.scrollTop, 100)
})

test('updates scroll position when page prop changes', t => {
  paginatorY.setProps({ page: 1 })
  t.is(paginatorY.instance().$el.scrollTop, 100)
})

test('calls onPaginate prop with new page number when scroll velocity threshold is reached', t => {
  paginatorY.instance().handleWheel({ deltaY: 0 })
  t.throws(() => td.verify(onPaginateY(td.matchers.anything())))

  paginatorY.instance().handleWheel({ deltaY: 10 })
  t.notThrows(() => td.verify(onPaginateY(2)))

  paginatorY.instance().handleWheel({ deltaY: -10 })
  t.notThrows(() => td.verify(onPaginateY(0)))
})

test('does not paginate outside range', t => {
  paginatorY.instance().handleWheel({ deltaY: -10 })
  t.throws(() => td.verify(onPaginateY(-1)))

  paginatorY.setProps({ page: 2 })
  paginatorY.instance().handleWheel({ deltaY: 10 })
  t.throws(() => td.verify(onPaginateY(3)))
})
