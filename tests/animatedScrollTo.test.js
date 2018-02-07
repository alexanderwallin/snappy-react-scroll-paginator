import test from 'ava'
import td from 'testdouble'
import scroll from 'scroll'

import { Axis } from '../src/constants.js'
import animatedScrollTo from '../src/animatedScrollTo.js'

test('invokes the `scroll` library with the correct arguments', t => {
  const scrollLeft = td.replace(scroll, 'left')
  const scrollTop = td.replace(scroll, 'top')

  const $el = {}
  const cb = () => {}

  animatedScrollTo({}, Axis.X, 0, 0, cb)
  t.notThrows(() => td.verify(scrollLeft($el, 0, { duration: 0 }, cb)))

  animatedScrollTo({}, Axis.Y, 0, 0, cb)
  t.notThrows(() => td.verify(scrollTop($el, 0, { duration: 0 }, cb)))
})
