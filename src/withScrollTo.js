/* eslint no-param-reassign: 0 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import scroll from 'scroll'
import { autobind } from 'core-decorators'

import { Axis } from './constants.js'

function scrollElementTo($el, axis, offset, duration, cb = () => {}) {
  if (axis === Axis.X) {
    scroll.left($el, offset, duration, cb)
  } else if (axis === Axis.Y) {
    scroll.top($el, offset, duration, cb)
  }
}

export default function withScrollTo(Component) {
  return class ComponentWithScrollTo extends PureComponent {
    static propTypes = {
      axis: PropTypes.oneOf([Axis.X, Axis.Y]),
      initialPage: PropTypes.number,
      pageHeight: PropTypes.number,
      pageWidth: PropTypes.number,
      scrollDuration: PropTypes.number,
    }

    static defaultProps = {
      axis: Axis.Y,
      initialPage: 0,
      pageHeight: 0,
      pageWidth: 0,
      scrollDuration: 0,
    }

    constructor(props) {
      super(props)

      this.state = {
        isScrolling: false,
        page: props.initialPage,
      }
    }

    @autobind
    handleMount($el) {
      const { axis, pageHeight, pageWidth } = this.props
      const { page } = this.state

      scrollElementTo(
        $el,
        axis,
        page * (axis === Axis.X ? pageWidth : pageHeight),
        0
      )
    }

    @autobind
    handlePaginate(page, $el) {
      const { axis, pageHeight, pageWidth, scrollDuration } = this.props

      this.setState({
        isScrolling: true,
        page,
      })

      scrollElementTo(
        $el,
        axis,
        page * (axis === Axis.X ? pageWidth : pageHeight),
        scrollDuration,
        () => this.setState({ isScrolling: false })
      )
    }

    render() {
      const { initialPage, scrollDuration, ...props } = this.props
      const { isScrolling, page } = this.state

      return (
        <Component
          page={page}
          mayPaginate={isScrolling === false}
          onMount={this.handleMount}
          onPaginate={this.handlePaginate}
          {...props}
        />
      )
    }
  }
}
