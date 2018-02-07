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
      initialPage: PropTypes.number,
      pageSize: PropTypes.number,
      scrollDuration: PropTypes.number,
      scrollPause: PropTypes.number,
      scrollTo: PropTypes.func,
    }

    static defaultProps = {
      axis: Axis.Y,
      initialPage: 0,
      pageSize: 0,
      scrollDuration: 0,
      scrollPause: 0,
      scrollTo: () => {},
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
      const { axis, pageSize, scrollTo } = this.props
      const { page } = this.state

      scrollTo($el, axis, page * pageSize, 1)
    }

    @autobind
    handlePaginate(page, $el) {
      const {
        axis,
        pageSize,
        scrollDuration,
        scrollPause,
        scrollTo,
      } = this.props

      this.setState({
        isScrolling: true,
        page,
      })

      scrollTo($el, axis, page * pageSize, scrollDuration, () => {
        window.setTimeout(() => {
          this.setState({ isScrolling: false })
        }, scrollPause)
      })
    }

    render() {
      const { initialPage, scrollDuration, scrollTo, ...props } = this.props
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

  const componentDisplayName =
    Component.dispalyName || Component.name || 'Component'
  ComponentWithScrollTo.displayName = `withScrollTo(${componentDisplayName})`

  return ComponentWithScrollTo
}
