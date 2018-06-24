/* eslint-disable no-console, no-unused-vars */
import React from 'react'

class Edit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      isbn: '',
      title: '',
      author: '',
      genre: '',
      price: '',
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }
  componentDidMount() {
    this.setState({
      isbn: this.props.book.isbn,
      title: this.props.book.title,
      author: this.props.book.author,
      genre: this.props.book.genre,
      price: this.props.book.price,
    })
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleClick() {
    this.setState({ editing: true })
  }
  handleSubmit(e) {
    e.preventDefault()
    console.log('?', this.props.id)
    const { isbn, title, author, genre, price } = this.state
    this.props.onEdit({
      id: this.props.book.id,
      isbn,
      title,
      author,
      genre,
      price,
    })
  }
  handleCancel() {
    this.setState({
      editing: false,
      isbn: this.props.book.isbn,
      title: this.props.book.title,
      author: this.props.book.author,
      genre: this.props.book.genre,
      price: this.props.book.price,
    })
  }

  render() {
    return (
      <div>
        <div onClick={this.handleClick}>Edit</div>
        <div onClick={this.handleCancel}>Cancel</div>
        <form
          className={this.state.editing ? 'editing' : undefined}
          onSubmit={this.handleSubmit}
        >
          <fieldset disabled={this.state.editing ? undefined : true}>
            <label>
              ISBN:
              <input
                name="isbn"
                type="text"
                onChange={this.handleChange}
                value={this.state.isbn}
              />
            </label>
            <label>
              Title:
              <input
                name="title"
                type="text"
                onChange={this.handleChange}
                value={this.state.title}
              />
            </label>
            <label>
              Author:
              <input
                name="author"
                type="text"
                onChange={this.handleChange}
                value={this.state.author}
              />
            </label>
            <label>
              Genre:
              <input
                name="genre"
                type="text"
                onChange={this.handleChange}
                value={this.state.genre}
              />
            </label>
            <label>
              Price:
              <input
                name="price"
                type="text"
                onChange={this.handleChange}
                value={this.state.price}
              />
            </label>
            <button type="submit">Save</button>
          </fieldset>
        </form>
      </div>
    )
  }
}

module.exports = Edit
