# snappy-react-scroll-paginator

`snappy-react-scroll-paginator` is your good pal in composing snappy, scroll-based pagination components in React-land. It's purpose is to provide the pieces you need to make your convention breaking, UI nightmare scroll magic thingy yourself, with as much customisability as possible.

Pagination works along a single given axis and snaps to a fixed interval offset.

No work has gone into making this work on mobile.

## Installation

```
npm i snappy-react-scroll-paginator
```

## Usage

This is a typical animating scroll paginator.

```js
import {
  SnappyScrollPaginator,
  Axis,
  withScrollTo,
  animatedScrollTo,
} from 'snappy-react-scroll-paginator'

const AnimatingSnappyScrollPaginator = withScrollTo(SnappyScrollPaginator)

<AnimatingSnappyScrollPaginator
  axis={Axis.Y}
  numPages={4}
  initialPage={0}
  pageSize={500}
  velocityThreshold={50}
  scrollDuration={1000}
  scrollPause={500}
  scrollTo={animatedScrollTo}
  style={{
    height: 200,
    overflow: 'hidden',
  }}
>
  {/* Child elements go here */}
</AnimatingSnappyScrollPaginator>
```

## API

Be right with you!

## License

[Unlicense](LICENSE.md)
