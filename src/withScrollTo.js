import { compose, mapProps, withStateHandlers } from 'recompose'

import { Axis } from './constants.js'

export default function withScrollTo(Component) {
  return compose(
    withStateHandlers(
      ({ initialPage = 0 }) => ({
        page: initialPage,
      }),
      {
        onPaginate: (_, { axis, pageHeight, pageWidth }) => (newPage, $el) => {
          if (axis === Axis.X) {
            $el.scrollLeft = newPage * pageWidth
          } else if (axis === Axis.Y) {
            $el.scrollTop = newPage * pageHeight
          }

          return { page: newPage }
        },
      }
    ),
    mapProps(({ initialPage, ...props }) => props)
  )(Component)
}
