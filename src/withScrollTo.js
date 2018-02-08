/* eslint no-param-reassign: 0 */
/* global window */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'

import { Axis } from './constants.js'

export default function withScrollTo(Component) {
  class ComponentWithScrollTo extends PureComponent {
    static propTypes = {
      axis: PropTypes.oneOf([Axis.X, Axis.Y]),
      onPaginate: PropTypes.func,
      page: PropTypes.number,
      pageSize: PropTypes.number,
      scrollDuration: PropTypes.number,
      scrollPause: PropTypes.number,
      scrollTo: PropTypes.func,
    }

    static defaultProps = {
      axis: Axis.Y,
      onPaginate: () => {},
      page: 0,
      pageSize: 0,
      scrollDuration: 0,
      scrollPause: 0,
      scrollTo: () => {},
    }

    constructor(props) {
      super(props)

      this.state = {
        isScrolling: false,
      }
    }

    @autobind
    handleMount($el) {
      const { axis, page, pageSize, scrollTo } = this.props

      scrollTo($el, axis, page * pageSize, 1)
    }

    @autobind
    handlePaginate(page, $el, details) {
      const {
        axis,
        onPaginate,
        pageSize,
        scrollDuration,
        scrollPause,
        scrollTo,
      } = this.props

      scrollTo($el, axis, page * pageSize, scrollDuration, () => {
        window.setTimeout(() => {
          this.setState({ isScrolling: false })
        }, scrollPause)
      })

      this.setState({ isScrolling: true }, () => {
        // Bubble
        onPaginate(page, $el, details)
      })
    }

    render() {
      const { page, scrollDuration, scrollTo, ...props } = this.props
      const { isScrolling } = this.state

      return (
        <Component
          {...props}
          page={page}
          mayPaginate={isScrolling === false}
          onMount={this.handleMount}
          onPaginate={this.handlePaginate}
        />
      )
    }
  }

  const componentDisplayName =
    Component.dispalyName || Component.name || 'Component'
  ComponentWithScrollTo.displayName = `withScrollTo(${componentDisplayName})`

  return ComponentWithScrollTo
}
