import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'

export default function withPaginationState(Component) {
  class ComponentWithPaginationState extends PureComponent {
    static propTypes = {
      initialPage: PropTypes.number,
      onPaginate: PropTypes.func,
    }

    static defaultProps = {
      initialPage: 0,
      onPaginate: () => {},
    }

    constructor(props) {
      super(props)

      this.state = {
        page: Number.isFinite(props.initialPage) ? props.initialPage : 0,
      }
    }

    @autobind
    handlePaginate(page, $el) {
      const { onPaginate } = this.props

      this.setState({ page }, () => {
        // Bubble
        onPaginate(page, $el)
      })
    }

    render() {
      const { ...props } = this.props
      const { page } = this.state

      return (
        <Component {...props} onPaginate={this.handlePaginate} page={page} />
      )
    }
  }

  const componentDisplayName =
    Component.dispalyName || Component.name || 'Component'
  ComponentWithPaginationState.displayName = `withPaginationState(${componentDisplayName})`

  return ComponentWithPaginationState
}
