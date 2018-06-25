import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormGroup from '@material-ui/core/FormGroup'
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
        <form onSubmit={this.handleSubmit}>
          <FormGroup row>
            <TextField
              id="create-isbn"
              name="isbn"
              label="ISBN"
              margin="normal"
              onChange={this.handleChange}
              value={this.state.isbn}
            />
            <TextField
              id="create-title"
              name="title"
              label="Title"
              margin="normal"
              onChange={this.handleChange}
              value={this.state.title}
            />

            <TextField
              id="create-author"
              name="author"
              label="Author"
              margin="normal"
              onChange={this.handleChange}
              value={this.state.author}
            />

            <TextField
              id="create-genre"
              name="genre"
              label="Genre"
              margin="normal"
              onChange={this.handleChange}
              value={this.state.genre}
            />

            <TextField
              id="create-price"
              name="price"
              label="Price"
              margin="normal"
              onChange={this.handleChange}
              value={this.state.price}
            />
          </FormGroup>

          <Button variant="contained" color="primary" type="submit">
            Add Book
          </Button>
        </form>
      </div>
    )
  }
}

module.exports = Create
