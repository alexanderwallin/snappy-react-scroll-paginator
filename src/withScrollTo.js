/* eslint no-param-reassign: 0 */
/* global window */
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
      pageSize: PropTypes.number,
      scrollDuration: PropTypes.number,
      scrollPause: PropTypes.number,
    }

    static defaultProps = {
      axis: Axis.Y,
      initialPage: 0,
      pageSize: 0,
      scrollDuration: 0,
      scrollPause: 0,
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
      const { axis, pageSize } = this.props
      const { page } = this.state

      scrollElementTo($el, axis, page * pageSize, 0)
    }

    @autobind
    handlePaginate(page, $el) {
      const { axis, pageSize, scrollDuration, scrollPause } = this.props

      this.setState({
        isScrolling: true,
        page,
      })

      scrollElementTo($el, axis, page * pageSize, scrollDuration, () => {
        window.setTimeout(() => {
          this.setState({ isScrolling: false })
        }, scrollPause)
      })
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