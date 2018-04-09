import React, { Component } from 'react'
import createHistory from 'history/createBrowserHistory'

const { Provider, Consumer } = React.createContext('push-state-anchor')

class PushStateAnchorProvider extends Component {
  constructor() {
    super()
    this.state = { location: window.location }
    this.history = createHistory()
    this.history.listen(location => this.setState({location}))
  }

  render() {
    return <Provider value={{
      history: this.history,
      ...this.state
    }}>
      {this.props.children}
    </Provider>
  }
}

class PushStateAnchor extends Component {
  constructor() {
    super()
    this.state = {
      clientReady: false
    }
    this.interceptOnClick = this.interceptOnClick.bind(this)
  }

  componentDidMount() {
    this.setState({clientReady: true})
  }

  interceptOnClick(event, value) {
    event.preventDefault()
    value.history.push(this.props.href)
  }

  render() { 
    const { onClick, ...otherProps } = this.props
    return (
      <Consumer>
        {value => (
          <a
            onClick={(event) => {
              this.state.clientReady ? this.interceptOnClick(event, value) : onClick(event)
            }}
            {...otherProps}
          >
            {otherProps.children}
          </a>
        )}
      </Consumer>
    )
  }
}

const PushStateLocation = (props) =>
  <Consumer>
    {value => props.children(value.location)}
  </Consumer>

export {
  PushStateAnchorProvider,
  PushStateAnchor,
  PushStateLocation
}