import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

/**
 * Snappy Scroll Paginator
 */
class SnappyScrollPaginator extends PureComponent {
  static propTypes = {
    page: PropTypes.number.isRequired,
  }

  render() {
    const { page } = this.props

    return <div className="SnappyScrollPaginator">{page}</div>
  }
}

export default SnappyScrollPaginator
