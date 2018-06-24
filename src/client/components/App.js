import React from 'react'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { status: 'not connected' }
  }
  componentDidMount() {
    axios.get(`/api`).then(res => {
      const { status } = res.data
      this.setState({ status })
    })
  }
  render() {
    return (
      <div className="App" id="test">
        <h1>React: App.js!</h1>
        <p>Server: {this.state.status}</p>
      </div>
    )
  }
}

module.exports = App
