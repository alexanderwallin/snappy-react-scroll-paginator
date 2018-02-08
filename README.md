# snappy-react-scroll-paginator

`snappy-react-scroll-paginator` is your good pal in composing snappy, scroll-based pagination components in React-land. It's purpose is to provide the pieces you need to make your convention breaking, UI nightmare scroll magic thingy yourself, with as much customisability as possible.

Pagination works along a single given axis and snaps to a fixed interval offset, with support for nested paginators that paginates along different axises.

No effort has gone into making this work on mobile.

## Table of contents

* [Installation](#installation)
* [Usage](#usage)
* [API](#api)
* [License](#license)

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
  withPaginationState,
  withScrollTo,
  animatedScrollTo,
} from 'snappy-react-scroll-paginator'

const AnimatingSnappyScrollPaginator = withPaginationState(
  withScrollTo(SnappyScrollPaginator)
)

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
    height: 500,
    overflow: 'hidden',
  }}
>
  {/* Child elements go here */}
</AnimatingSnappyScrollPaginator>
```

## API

* [`animatedScrollTo()`](#animatedscrolltoel-htmlelement-axis-axis-offset-number-duration-number-cb-funtion)
* [`Axis`](#axis)
* [`<SnappyScrollPaginator />`](snappyscrollpaginator-)
* [`withPaginationState()`](#withpaginationstatecomponent-snappyscrollpaginator--component)
* [`withScrollTo()`](#withscrolltocomponent-snappyscrollpaginator--component)

### `Axis`

`Axis` is an enum object with `X` and `Y` properties:

```js
Axis.X // === 'X'
Axis.Y // === 'Y'
```

### `<SnappyScrollPaginator />`

This component is both pretty smart and quite stupid. It is smart in the sense that it captures `wheel` events and invokes `onPaginate()` when the direction and velocity of the scroll meets certain criteria provided in the props.

It is stupid in the sense that **it doesn't keep any state on what page it is on**. It is up to you to store this in a stateful/smart (higher-order) component. Now, before you run off in complete panic, we do provide the [`withPaginationState()`](#withpaginationstatecomponent-snappyscrollpaginator--component) and [`withScrollTo()`](#withscrolltocomponent-snappyscrollpaginator--component) decorators that takes care of most of that stuff.

#### Props

* `axis` - Which axis to paginate along
* `children` - Child nodes
* `className` - A class name that will be set on the root element
* `isEnabled` - Whether the paginator is enabled or not. If set to `false`, no scroll or wheel events will be touched.
* `mayPaginate` - Whether pagination should take place. This will not affect event cancellation, which means you can capture scrolling behaviour while pausing actual pagination.
* `numPages` - How many pages are in the paginator
* `onMount($el: HTMLElement)` - A function that is called then component has been rendered. `$el` is a reference to the root element.
* `onPaginate(page: Number, $el: HTMLElement)` - A function that is called when a pagination takes place. `$el` is a reference to the root element.
* `page` - The index of the current page
* `scrollWobbleThreshold` - The amount of scrolling along the wrong axis that is allowed before the component steps aside and lets the wheel events bubble.
* `style` - A style object
* `velocityThreshold` - How fast the user must be scrolling before triggering pagination. This means `deltaX` or `deltaY` (depending on the axis) must be greater or equal to this value.

### `withPaginationState(Component: SnappyScrollPaginator) => Component`

This function returns a component that keeps track of the current page.

#### Result component props

* `initialPage` - Which page to start at
* All props supported by `<SnappyScrollPaginator />`

### `withScrollTo(Component: SnappyScrollPaginator) => Component`

This little bugger turns `<SnappyScrollPaginator />` into an actual scrolling paginator. Well, almost; you need to provide it a function that handles scrolling, but other than that you're good!

It returns a component that keeps track of the current page and orchestrates the actual scrolling.

The default behavior - the default value of the `scrollTo` prop - is to do absolutely nothing. It is up to you to give it a function that handles the scrolling (animation), i.e. you can do **whatever you want here**. To account for us lazy folks, we provide a [`animatedScrollTo()`](#animatedscrolltoel-htmlelement-axis-axis-offset-number-duration-number-cb-funtion) function that you can use to get an ease-in-out animation.

#### Result component props

* `pageSize` - How wide or tall each page is
* `scrollDuration` - How long a scroll animation should be
* `scrollPause` - How long to wait after a scroll animation has completed before re-enabling pagination
* `scrollTo($el: HTMLElement, axis: Axis, offset: Number, duration: Number, cb: Funtion)` - A function which should scroll `$el` to `offset` along `axis` for `duration` milliseconds, and call `cb()` when it's done.
* All props supported by `<SnappyScrollPaginator />`

### `animatedScrollTo($el: HTMLElement, axis: Axis, offset: Number, duration: Number, cb: Funtion)`

This function animates scrolling of `$el` using the [`scroll`](https://github.com/michaelrhodes/scroll) library. It works just like the `scrollTo()` prop explained above.

## License

[Unlicense](LICENSE.md)
