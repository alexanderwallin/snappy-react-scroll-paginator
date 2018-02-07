import test from 'ava'
import td from 'testdouble'
import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import SnappyScrollPaginator from '../src/SnappyScrollPaginator.js'

Enzyme.configure({ adapter: new Adapter() })

test('has correct initial scroll position', t => {
  const paginator1 = mount(
    <SnappyScrollPaginator
      axis={SnappyScrollPaginator.Axis.Y}
      page={1}
      numPages={3}
      pageHeight={100}
    />
  )
  t.is(paginator1.instance().$el.scrollTop, 100)

  const paginator2 = mount(
    <SnappyScrollPaginator
      axis={SnappyScrollPaginator.Axis.X}
      page={2}
      numPages={3}
      pageWidth={200}
    />
  )
  t.is(paginator2.instance().$el.scrollLeft, 400)
})

test('updates scroll position when page prop changes', t => {
  const paginator = mount(
    <SnappyScrollPaginator
      axis={SnappyScrollPaginator.Axis.Y}
      page={0}
      numPages={3}
      pageHeight={100}
    />
  )
  paginator.setProps({ page: 1 })
  t.is(paginator.instance().$el.scrollTop, 100)
})

test('calls onPaginate prop with new page number when scroll velocity threshold is reached', t => {
  const onPaginate = td.function('onPaginate')
  const paginator = mount(
    <SnappyScrollPaginator
      axis={SnappyScrollPaginator.Axis.Y}
      page={1}
      numPages={3}
      velocityThreshold={10}
      onPaginate={onPaginate}
    />
  )

  paginator.instance().handleWheel({ deltaY: 0 })
  t.throws(() => td.verify(onPaginate(td.matchers.anything())))

  paginator.instance().handleWheel({ deltaY: 10 })
  t.notThrows(() => td.verify(onPaginate(2)))

  paginator.instance().handleWheel({ deltaY: -10 })
  t.notThrows(() => td.verify(onPaginate(0)))
})

test('does not paginate outside range', t => {
  const onPaginate = td.function('onPaginate')
  const paginator = mount(
    <SnappyScrollPaginator
      axis={SnappyScrollPaginator.Axis.Y}
      page={0}
      numPages={1}
      velocityThreshold={10}
      onPaginate={onPaginate}
    />
  )

  paginator.instance().handleWheel({ deltaY: 10 })
  t.throws(() => td.verify(onPaginate(1)))

  paginator.instance().handleWheel({ deltaY: -10 })
  t.throws(() => td.verify(onPaginate(-1)))
})
