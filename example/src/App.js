import React, { PureComponent } from 'react'
import { autobind } from 'core-decorators'

import SnappyScrollPaginator from '../../src/SnappyScrollPaginator.js'
import withScrollTo from '../../src/withScrollTo.js'

const pages = [
  { title: 'Page 0' },
  { title: 'Page 1' },
  { title: 'Page 2' },
  { title: 'Page 3' },
]

const colors = ['red', 'green', 'blue', 'pink']

const ScrollingSnappyScrollPaginator = withScrollTo(SnappyScrollPaginator)

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

    const children = pages.map((p, i) => (
      <div
        key={p.title}
        style={{
          height: 200,
          backgroundColor: colors[i],
        }}
      >
        {p.title}
      </div>
    ))

    return (
      <div className="App">
        <h2>
          <code>SnappyScrollPaginator</code>
        </h2>
        <SnappyScrollPaginator
          axis={SnappyScrollPaginator.Axis.Y}
          page={page}
          numPages={pages.length}
          pageSize={200}
          velocityThreshold={50}
          style={{
            height: 200,
            overflow: 'hidden',
          }}
          onPaginate={this.handlePaginate}
        >
          {children}
        </SnappyScrollPaginator>

        <h2>
          <code>withScrollTo(SnappyScrollPaginator)</code>
        </h2>
        <ScrollingSnappyScrollPaginator
          axis={SnappyScrollPaginator.Axis.Y}
          initialPage={2}
          numPages={pages.length}
          pageSize={200}
          velocityThreshold={30}
          scrollDuration={500}
          scrollPause={500}
          style={{
            height: 200,
            overflow: 'hidden',
          }}
        >
          {children}
        </ScrollingSnappyScrollPaginator>

        <h2>
          <code>withScrollTo(SnappyScrollPaginator)</code> (x axis)
        </h2>
        <ScrollingSnappyScrollPaginator
          axis={SnappyScrollPaginator.Axis.X}
          initialPage={1}
          numPages={pages.length}
          pageSize={200}
          velocityThreshold={50}
          scrollDuration={800}
          scrollPause={500}
          style={{
            width: 200,
            height: 200,
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', width: 200 * pages.length }}>
            {pages.map((p, i) => (
              <div
                key={p.title}
                style={{
                  width: 200,
                  height: 200,
                  backgroundColor: colors[i],
                }}
              >
                {p.title}
              </div>
            ))}
          </div>
        </ScrollingSnappyScrollPaginator>
      </div>
    )
  }
}

export default App
