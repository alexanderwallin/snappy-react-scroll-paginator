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

import { Axis } from './constants.js'

export default function withScrollTo(Component) {
  return compose(
    setPropTypes({
      initialPage: PropTypes.number,
    }),
    withStateHandlers(
      ({ initialPage }) => ({
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
    defaultProps({
      initialPage: 0,
    }),
    withProps(({ axis, page, pageHeight, pageWidth }) => ({
      onMount: $el => {
        if (axis === Axis.X) {
          $el.scrollLeft = page * pageWidth
        } else if (axis === Axis.Y) {
          $el.scrollTop = page * pageHeight
        }
      },
    })),
    mapProps(({ initialPage, ...props }) => props)
  )(Component)
}
