import scroll from 'scroll'

import { Axis } from './constants.js'

export default function animatedScrollTo(
  $el,
  axis,
  offset,
  duration,
  cb = () => {}
) {
  if (axis === Axis.X) {
    scroll.left($el, offset, { duration }, cb)
  } else if (axis === Axis.Y) {
    scroll.top($el, offset, { duration }, cb)
  }
}
