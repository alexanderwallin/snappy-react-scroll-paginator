import test from 'ava'

import * as lib from '../src/index.js'

import { Axis } from '../src/constants.js'
import SnappyScrollPaginator from '../src/SnappyScrollPaginator.js'
import withScrollTo from '../src/withScrollTo.js'

test('exports Axis, SnappyScrollPaginator and withScrollTo', t => {
  t.is(lib.Axis, Axis)
  t.is(lib.SnappyScrollPaginator, SnappyScrollPaginator)
  t.is(lib.withScrollTo, withScrollTo)
})
