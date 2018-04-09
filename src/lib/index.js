import React, { Component } from 'react'
import createHistory from 'history/createBrowserHistory'

const { Provider, Consumer } = React.createContext('push-state-anchor')

class PushStateAnchorProvider extends Component {
  constructor() {
    super()
    this.state = { location: null, history: null }
  }

  componentDidMount() {
    const history = createHistory()
    history.listen(location => this.setState({location}))
    this.setState({
      history,
      location: window.location
    })
  }

  render() {
    return <Provider value={{
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
    const { children, ...otherProps } = this.props
    return (
      <Consumer>
        {value => value ? (
          <a
            onClick={(event) => {
              this.interceptOnClick(event, value)
            }}
            {...otherProps}
          >
            {children}
          </a>
        ) : (
          <a {...otherProps}>
            {children}
          </a>
        )}
      </Consumer>
    )
  }
}

const PushStateLocation = (props) =>
  <Consumer>
    {value => value.location && props.children(value.location)}
  </Consumer>

export {
  PushStateAnchorProvider,
  PushStateAnchor,
  PushStateLocation
}