import React, { PureComponent } from 'react'
import { autobind } from 'core-decorators'

import SnappyScrollPaginator from '../../src/SnappyScrollPaginator.js'

const pages = [
  { title: 'Page 1' },
  { title: 'Page 2' },
  { title: 'Page 3' },
  { title: 'Page 4' },
]

const colors = ['red', 'green', 'blue', 'pink']

/**
 * App
 */
class App extends PureComponent {
  state = {
    page: 0,
  }

  @autobind
  handlePaginate(page, $el) {
    this.setState({ page })

    // eslint-disable-next-line no-param-reassign
    $el.scrollTop = page * 200
  }

  render() {
    const { page } = this.state

    return (
      <div className="App">
        <SnappyScrollPaginator
          axis={SnappyScrollPaginator.Axis.Y}
          page={page}
          numPages={pages.length}
          pageHeight={200}
          velocityThreshold={50}
          style={{
            height: 200,
            overflow: 'hidden',
          }}
          onPaginate={this.handlePaginate}
        >
          {pages.map((p, i) => (
            <div
              key={p.title}
              style={{
                height: 200,
                backgroundColor: colors[i],
              }}
            >
              {p.title}
            </div>
          ))}
        </SnappyScrollPaginator>
      </div>
    )
  }
}

export default App
