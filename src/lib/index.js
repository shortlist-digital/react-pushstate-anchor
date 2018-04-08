import React, { Component } from 'react'
import createHistory from 'history/createBrowserHistory'

const { Provider, Consumer } = React.createContext('push-state-anchor')

class PushStateAnchorProvider extends Component {
  constructor() {
    super()
    this.state = {
      location: window.location
    }
    this.history = createHistory()
    this.history.listen(location => {
      this.setState({
        location
      })
    })
  }

  render = () => (
    <Provider value={{
      history: this.history,
      ...this.state
    }}>
      {this.props.children}
    </Provider>
  )
}

const PushStateAnchor = (props) =>
  <Consumer>
    {value => (
      <a
        href={props.href}
        onClick={event => {
          event.preventDefault()
          value.history.push(props.href)
        }}
      >
        {props.children}
      </a>
    )}
  </Consumer>

const PushStateLocation = (props) =>
  <Consumer>
    {value => props.children(value.location)}
  </Consumer>

export {
  PushStateAnchorProvider,
  PushStateAnchor,
  PushStateLocation
}