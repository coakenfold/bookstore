import React from 'react'

class Create extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isbn: '',
      title: '',
      author: '',
      genre: '',
      price: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleSubmit(e) {
    e.preventDefault()

    const { isbn, title, author, genre, price } = this.state
    this.props.onCreate({
      isbn,
      title,
      author,
      genre,
      price,
    })
  }
  handleCancel() {
    this.setState({
      isbn: '',
      title: '',
      author: '',
      genre: '',
      price: '',
    })
  }

  render() {
    return (
      <div>
        <h2>Add</h2>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <label htmlFor={`create-isbn`}>
              ISBN:
              <input
                id={`create-isbn`}
                name="isbn"
                type="text"
                onChange={this.handleChange}
                value={this.state.isbn}
              />
            </label>
            <label htmlFor={`create-title`}>
              Title:
              <input
                id={`create-title`}
                name="title"
                type="text"
                onChange={this.handleChange}
                value={this.state.title}
              />
            </label>
            <label htmlFor={`create-author`}>
              Author:
              <input
                id={`create-author`}
                name="author"
                type="text"
                onChange={this.handleChange}
                value={this.state.author}
              />
            </label>
            <label htmlFor={`create-genre`}>
              Genre:
              <input
                id={`create-genre`}
                name="genre"
                type="text"
                onChange={this.handleChange}
                value={this.state.genre}
              />
            </label>
            <label htmlFor={`create-price`}>
              Price:
              <input
                id={`create-price`}
                name="price"
                type="text"
                onChange={this.handleChange}
                value={this.state.price}
              />
            </label>
            <button type="submit">Create</button>
            <div onClick={this.handleCancel}>Cancel</div>
          </fieldset>
        </form>
      </div>
    )
  }
}

module.exports = Create
