import test from 'ava'
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


