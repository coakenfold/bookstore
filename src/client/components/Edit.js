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
            <label htmlFor={`edit-${this.props.book.id}-isbn`}>ISBN:</label>
            <input
              id={`edit-${this.props.book.id}-isbn`}
              name="isbn"
              type="text"
              onChange={this.handleChange}
              value={this.state.isbn}
            />
            <label htmlFor={`edit-${this.props.book.id}-title`}>Title:</label>
            <input
              id={`edit-${this.props.book.id}-title`}
              name="title"
              type="text"
              onChange={this.handleChange}
              value={this.state.title}
            />
            <label htmlFor={`edit-${this.props.book.id}-author`}>Author:</label>
            <input
              id={`edit-${this.props.book.id}-author`}
              name="author"
              type="text"
              onChange={this.handleChange}
              value={this.state.author}
            />
            <label htmlFor={`edit-${this.props.book.id}-genre`}>Genre:</label>
            <input
              id={`edit-${this.props.book.id}-genre`}
              name="genre"
              type="text"
              onChange={this.handleChange}
              value={this.state.genre}
            />
            <label htmlFor={`edit-${this.props.book.id}-price`}>Price:</label>
            <input
              id={`edit-${this.props.book.id}-price`}
              name="price"
              type="text"
              onChange={this.handleChange}
              value={this.state.price}
            />
            <button type="submit">Save</button>
          </fieldset>
        </form>
      </div>
    )
  }
}

module.exports = Edit
