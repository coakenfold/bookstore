import React from 'react'

class Add extends React.Component {
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
  componentDidMount() {}
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
            <button type="submit">Create</button>
            <div onClick={this.handleCancel}>Cancel</div>
          </fieldset>
        </form>
      </div>
    )
  }
}

module.exports = Add
