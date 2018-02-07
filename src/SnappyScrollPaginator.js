import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'

const Axis = {
  X: 'X',
  Y: 'Y',
}

/**
 * Snappy Scroll Paginator
 */
class SnappyScrollPaginator extends PureComponent {
  static Axis = Axis

  static propTypes = {
    axis: PropTypes.oneOf([Axis.X, Axis.Y]),
    numPages: PropTypes.number.isRequired,
    page: PropTypes.number,
    pageHeight: PropTypes.number,
    pageWidth: PropTypes.number,
  }

  static defaultProps = {
    axis: Axis.Y,
    page: 0,
    pageHeight: 0,
    pageWidth: 0,
  }

  $el = null

  @autobind
  handleRef($el) {
    this.$el = $el
    this.updateScrollPosition()
  }

  updateScrollPosition() {
    const { axis, page, pageHeight, pageWidth } = this.props

    if (axis === Axis.X) {
      this.$el.scrollLeft = page * pageWidth
    } else if (axis === Axis.Y) {
      this.$el.scrollTop = page * pageHeight
    }
  }

  render() {
    const { page } = this.props

    return <div ref={this.handleRef}>{page}</div>
  }
}

export default SnappyScrollPaginator
