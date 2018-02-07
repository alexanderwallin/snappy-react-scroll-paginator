import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'

import { Axis } from './constants.js'

/**
 * Snappy Scroll Paginator
 */
class SnappyScrollPaginator extends PureComponent {
  static Axis = Axis

  static propTypes = {
    axis: PropTypes.oneOf([Axis.X, Axis.Y]),
    children: PropTypes.node.isRequired,
    isEnabled: PropTypes.bool,
    mayPaginate: PropTypes.bool,
    numPages: PropTypes.number.isRequired,
    onMount: PropTypes.func,
    onPaginate: PropTypes.func.isRequired,
    page: PropTypes.number,
    scrollWobbleThreshold: PropTypes.number,
    style: PropTypes.shape({}),
    velocityThreshold: PropTypes.number,
  }

  static defaultProps = {
    axis: Axis.Y,
    isEnabled: true,
    mayPaginate: true,
    onMount: () => {},
    page: 0,
    scrollWobbleThreshold: 10,
    style: {},
    velocityThreshold: 51,
  }

  $el = null

  @autobind
  handleRef($el) {
    const { onMount } = this.props

    onMount($el)
    this.$el = $el
  }

  @autobind
  handleScroll(evt) {
    const { isEnabled } = this.props

    if (isEnabled === false) {
      return
    }

    evt.preventDefault()
    evt.stopPropagation()
  }

  @autobind
  handleWheel(evt) {
    const {
      axis,
      isEnabled,
      mayPaginate,
      numPages,
      onPaginate,
      page,
      scrollWobbleThreshold,
      velocityThreshold,
    } = this.props

    if (isEnabled === false) {
      return
    }

    if (
      (axis === Axis.X && Math.abs(evt.deltaY) >= scrollWobbleThreshold) ||
      (axis === Axis.Y && Math.abs(evt.deltaX) >= scrollWobbleThreshold)
    ) {
      return
    }

    evt.preventDefault()
    evt.stopPropagation()

    if (mayPaginate === false) {
      return
    }

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
        onScroll={this.handleScroll}
        onWheel={this.handleWheel}
      >
        {children}
      </div>
    )
  }
}

export default SnappyScrollPaginator
