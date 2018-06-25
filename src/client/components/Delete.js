import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

class Delete extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isbn: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(e) {
    this.setState({ isbn: e.target.value })
  }
  handleSubmit(e) {
    e.preventDefault()
    if (this.props.isbn === this.state.isbn) {
      this.props.onDelete(this.props.id)
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextField
            id={`delete-${this.props.id}-isbn`}
            name="isbn"
            label="Type the isbn to delete"
            margin="normal"
            onChange={this.handleChange}
            value={this.state.isbn}
          />

          <Button
            size="small"
            variant="contained"
            color="secondary"
            type="submit"
          >
            Delete
          </Button>
        </form>
      </div>
    )
  }
}

module.exports = Delete
