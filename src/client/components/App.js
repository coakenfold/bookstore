import React from 'react'
import Books from './Books'

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="App" id="test">
        <Books />
      </div>
    )
  }
}

module.exports = App
