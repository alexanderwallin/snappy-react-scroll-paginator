import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'

const Axis = {
  X: 'X',
  Y: 'Y',
}

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
    this.updateScrollPosition()
  }

  @autobind
  handleWheel(evt) {
    const { axis, numPages, onPaginate, page, velocityThreshold } = this.props

    evt.preventDefault()
    evt.stopPropagation()

    const d = axis === Axis.X ? evt.deltaX : evt.deltaY
    if (Math.abs(d) >= velocityThreshold) {
      if (d < 0 && page !== 0) {
        onPaginate(page - 1)
      } else if (d > 0 && page < numPages - 1) {
        onPaginate(page + 1)
      }
    }
  }

  updateScrollPosition() {
    const { axis, page, pageHeight, pageWidth } = this.props

    if (axis === Axis.X) {
      this.$el.scrollLeft = page * pageWidth
    } else if (axis === Axis.Y) {
      this.$el.scrollTop = page * pageHeight
    }
  }

  componentDidUpdate(prevProps) {
    const { page } = this.props

    if (page !== prevProps.page) {
      this.updateScrollPosition()
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
