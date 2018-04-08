# React PushState Anchor

## What is it?

React PushState Anchor provides three components for performing client-side push state navigation. There's no routing or complex state management. Just three components

### `<PushStateAnchorProvider />`

Wrap your entire application or just the part of the application you want to use pushState in.

### `<PushStateAnchor />`

A replacement for `<a>` tags that will use `history.pushState` under the hood.

```
import { PushStateAnchor as A } from 'react-pushstate-anchor'
<A href='/home'>Home</A>
```

### `PushStateLocation />`

A utitlity component that will provide the current history location using a render callback.

```
import { PushStateLocaation } from 'react-pushstate-anchor'

<PushStateLocation>
  {location => {
    <h1>The current pathname is {location.pathname}</h1>
  )}
</PushStateLocation>
```

## Installation

Install from NPM, `react-pushstate-anchor` requires the `history` module as a peer dependency.

`yarn add react-pushstate-anchor history`

## Usage

```js
import React, { Component } from 'react'
import { PushStateAnchorProvider, PushStateLocation, PushStateAnchor as Psa } from 'react-pushstate-anchor'

class App extends Component {
  render() {
    return (
      <PushStateAnchorProvider>
        <h1>Push State Anchor</h1>        
        <Psa href='/home'><button>Home</button></Psa>
        <Psa href='/about'><button>About</button></Psa>
        <Psa href='/careers'><button>Careers</button></Psa>
        <PushStateLocation>
          {location => (
            <h1>{location.pathname}</h1>
          )}
        </PushStateLocation>
      </PushStateAnchorProvider>
    )
  }
}

export default App
```

`react-pushstate-anchor` will render a simple `<a>` anchor tag if JavaScript is unavailable.

