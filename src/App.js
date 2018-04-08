import React, { Component } from 'react'
import { PushStateAnchorProvider, PushStateLocation, PushStateAnchor as Psa } from './lib'

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
