import React from 'react'

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
      this.props.onSubmit(this.props.id)
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <label htmlFor={`delete-${this.props.id}-isbn`}>
              Type the isbn to delete
            </label>
            <input
              id={`delete-${this.props.id}-isbn`}
              onChange={this.handleChange}
              value={this.state.isbn}
              name="isbn"
              type="text"
              placeholder=""
            />
            <button>Delete</button>
          </fieldset>
        </form>
      </div>
    )
  }
}

module.exports = Delete
