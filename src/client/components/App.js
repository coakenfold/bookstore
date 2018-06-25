/* eslint-disable no-unused-vars */
import React from 'react'
import Books from './Books'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import style from './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="App">
        <CssBaseline />
        <Books />
      </div>
    )
  }
}

module.exports = App
