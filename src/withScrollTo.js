/* eslint no-param-reassign: 0 */
import {
  compose,
  defaultProps,
  mapProps,
  setPropTypes,
  withProps,
  withStateHandlers,
} from 'recompose'
import PropTypes from 'prop-types'
import scroll from 'scroll'

import { Axis } from './constants.js'

function scrollElementTo($el, axis, offset, duration) {
  if (axis === Axis.X) {
    scroll.left($el, offset, duration)
  } else if (axis === Axis.Y) {
    scroll.top($el, offset, duration)
  }
}

export default function withScrollTo(Component) {
  return compose(
    setPropTypes({
      initialPage: PropTypes.number,
      scrollDuration: PropTypes.number,
    }),
    withStateHandlers(
      ({ initialPage }) => ({
        page: initialPage,
      }),
      {
        onPaginate: (_, { axis, pageHeight, pageWidth, scrollDuration }) => (
          newPage,
          $el
        ) => {
          scrollElementTo(
            $el,
            axis,
            newPage * (axis === Axis.X ? pageWidth : pageHeight),
            scrollDuration
          )

          return { page: newPage }
        },
      }
    ),
    defaultProps({
      initialPage: 0,
      scrollDuration: 0,
    }),
    withProps(
      ({ axis, initialPage, pageHeight, pageWidth, scrollDuration }) => ({
        onMount: $el => {
          scrollElementTo(
            $el,
            axis,
            initialPage * (axis === Axis.X ? pageWidth : pageHeight),
            scrollDuration
          )
        },
      })
    ),
    mapProps(({ initialPage, ...props }) => props)
  )(Component)
}
