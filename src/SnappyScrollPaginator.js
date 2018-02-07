import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'

import { Axis } from './constants.js'

const cancelEvent = evt => {
  evt.preventDefault()
  evt.stopPropagation()
}

/**
 * Snappy Scroll Paginator
 */
class SnappyScrollPaginator extends PureComponent {
  static Axis = Axis

  static propTypes = {
    axis: PropTypes.oneOf([Axis.X, Axis.Y]),
    children: PropTypes.node.isRequired,
    numPages: PropTypes.number.isRequired,
    onPaginate: PropTypes.func.isRequired,
    page: PropTypes.number,
    pageHeight: PropTypes.number,
    pageWidth: PropTypes.number,
    style: PropTypes.shape({}),
    velocityThreshold: PropTypes.number,
  }

  static defaultProps = {
    axis: Axis.Y,
    page: 0,
    pageHeight: 0,
    pageWidth: 0,
    style: {},
    velocityThreshold: 51,
  }

  $el = null

  @autobind
  handleRef($el) {
    this.$el = $el
  }

  @autobind
  handleWheel(evt) {
    const { axis, numPages, onPaginate, page, velocityThreshold } = this.props

    evt.preventDefault()
    evt.stopPropagation()

    const d = axis === Axis.X ? evt.deltaX : evt.deltaY
    if (Math.abs(d) >= velocityThreshold) {
      if (d < 0 && page !== 0) {
        onPaginate(page - 1, this.$el)
      } else if (d > 0 && page < numPages - 1) {
        onPaginate(page + 1, this.$el)
      }
    }
  }

  render() {
    const { children, style } = this.props

    return (
      <div
        ref={this.handleRef}
        style={style}
        onScroll={cancelEvent}
        onWheel={this.handleWheel}
      >
        {children}
      </div>
    )
  }
}

export default SnappyScrollPaginator
